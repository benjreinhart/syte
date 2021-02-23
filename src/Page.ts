import path from "path";
import fm from "./fm";
import fs from "./fs";
import { PageType } from "./types";

function hasExtension(filePath: string, ext: string) {
  return path.extname(filePath) === ext;
}

export default class Page implements PageType {
  readonly absoluteFilePath: string;
  readonly relativeFilePath: string;
  readonly urlPath: string;
  readonly relativeOutputDirPath: string;

  private _contents: string | null = null;
  private _context: object | null = null;
  private _readPromise: Promise<string> | null = null;

  constructor(projectPagesPath: string, absoluteFilePath: string) {
    this.absoluteFilePath = absoluteFilePath;
    this.relativeFilePath = this._constructRelativeFilePath(projectPagesPath, absoluteFilePath);
    this.urlPath = this._constructUrlPath(this.relativeFilePath);
    this.relativeOutputDirPath = this._constructRelativeOutputDirPath(this.urlPath);
  }

  public isMarkdown() {
    return hasExtension(this.absoluteFilePath, ".md");
  }

  public isEjs() {
    return hasExtension(this.absoluteFilePath, ".ejs");
  }

  public async context(): Promise<object> {
    if (this._context === null) {
      await this._processFile();
    }

    return this._context as object;
  }

  public async contents(): Promise<string> {
    if (this._contents === null) {
      await this._processFile();
    }

    return this._contents as string;
  }

  private async _processFile() {
    const rawData = await this._read();
    const [context, contents] = fm.parse(rawData);
    this._context = context;
    this._contents = contents;
  }

  private _read() {
    if (this._readPromise === null) {
      this._readPromise = fs.read(this.absoluteFilePath);
    }

    return this._readPromise;
  }

  private _constructRelativeFilePath(projectPagesPath: string, absoluteFilePath: string) {
    // Constructs the difference between the two paths, e.g.:
    //
    //     const result = this._constructRelativeFilePath(
    //       "/Users/tobias/Desktop/mysite/pages",
    //       "/Users/tobias/Desktop/mysite/pages/blog/gobias-industries.md"
    //     );
    //
    //     console.log(result) // => "blog/gobias-industries.md"
    //
    return path.relative(projectPagesPath, absoluteFilePath);
  }

  private _constructUrlPath(relativeFilePath: string) {
    // Constructs the url path of this page, e.g.:
    //
    //     const result = this._constructUrlPath(
    //       "blog/gobias-industries.md",
    //     );
    //
    //     console.log(result) // => "/blog/gobias-industries"
    //
    let urlPath = relativeFilePath;

    // Remove supported extensions, e.g.:
    //
    //     foo/bar.ejs => foo/bar
    //     foo/bar.md => foo/bar
    //     foo/bar.baz.md => foo/bar.baz
    //
    urlPath = urlPath.replace(/(\.ejs|\.md)$/g, "");

    // urlPath should be the full path of the url, so ensure a '/' prefix
    urlPath = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;

    // If the file is an 'index' file, then omit 'index'
    urlPath = path.basename(urlPath) === "index" ? path.dirname(urlPath) : urlPath;

    return urlPath;
  }

  private _constructRelativeOutputDirPath(urlPath: string) {
    // Construct the relative output location. This is the same
    // value as the urlPath but without leading slash, e.g.:
    //
    //     const result = this._constructRelativeOutputDirPath(
    //       "/blog/gobias-industries",
    //     );
    //
    //     console.log(result) // => "blog/gobias-industries"
    //
    return urlPath.replace(/^\/+/, "");
  }
}

import path from "path";
import fm from "./fm";
import fs from "./fs";
import { PageFileType } from "./types";
import { shallowMerge } from "./utils";

export default class PageFile implements PageFileType {
  readonly absoluteFilePath: string;
  readonly urlPath: string;

  private _loaded: boolean = false;
  private _context: object | null = null;
  private _contents: string | null = null;

  constructor(projectPagesPath: string, absoluteFilePath: string) {
    this.absoluteFilePath = absoluteFilePath;
    this.urlPath = this._constructUrlPath(projectPagesPath, absoluteFilePath);
  }

  get context() {
    if (!this._loaded) {
      throw new Error("Cannot access page context before page file is loaded");
    }

    return this._context as object;
  }

  get contents() {
    if (!this._loaded) {
      throw new Error("Cannot access page contents before page file is loaded");
    }

    return this._contents as string;
  }

  async load() {
    if (!this._loaded) {
      const rawContents = await fs.read(this.absoluteFilePath);
      const [context, contents] = fm.parse(rawContents);
      this._context = context;
      this._contents = contents;
      this._loaded = true;
    }
  }

  isMarkdown() {
    return this.hasExtension(this.absoluteFilePath, ".md");
  }

  isEjs() {
    return this.hasExtension(this.absoluteFilePath, ".ejs");
  }

  private hasExtension(filePath: string, ext: string) {
    return path.extname(filePath) === ext;
  }

  private _constructUrlPath(projectPagesPath: string, absoluteFilePath: string) {
    const relativeFilePath = path.relative(projectPagesPath, absoluteFilePath);

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
}

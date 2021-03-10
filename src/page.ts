import path from "path";
import fm from "./fm";
import { FileType, PageType } from "./types";

function constructUrlPath(projectPagesPath: string, filePath: string) {
  const relativeFilePath = path.relative(projectPagesPath, filePath);

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

function hasExtension(filePath: string, ext: string) {
  return path.extname(filePath) === ext;
}

export default {
  create(projectPagesPath: string, file: FileType): PageType {
    const filePath = file.filePath;
    const urlPath = constructUrlPath(projectPagesPath, file.filePath);
    const [context, contents] = fm.parse(file.contents);
    return Object.freeze({ filePath, urlPath, contents, context });
  },

  isMarkdown(page: PageType) {
    return hasExtension(page.filePath, ".md");
  },

  isEjs(page: PageType) {
    return hasExtension(page.filePath, ".ejs");
  },
};

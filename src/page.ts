import path from "path";
import fm from "./fm";
import { FileType, PageType } from "./types";
import userData from "./user_data";

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
    const filePath = file.path;
    const urlPath = constructUrlPath(projectPagesPath, file.path);
    const [object, contents] = fm.parse(file.contents);
    const data = userData.create(object);
    return Object.freeze({ filePath, urlPath, contents, ...data });
  },

  isMarkdown(page: PageType) {
    return hasExtension(page.filePath, ".md");
  },

  isEjs(page: PageType) {
    return hasExtension(page.filePath, ".ejs");
  },
};

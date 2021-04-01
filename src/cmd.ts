import path from "path";
import ejs from "ejs";
import marked from "marked";
import templates from "./templates";
import fm from "./fm";
import fs from "./fs";
import { ContextType, FileType, LayoutType, PageType, ObjectType, SyteType } from "./types";
import { isObject, isString, loadYamlObject, shallowMerge } from "./utils";
import server from "./server";

function urlPathJoin(...paths: string[]) {
  let path = paths.join("/");

  // Replace duplicate slashes with one slash
  path = path.replace(/\/+/g, "/");

  // Remove leading and trailing slashes
  path = path.replace(/^\/|\/$/g, "");

  return `/${path}`;
}

const URI_RE = new RegExp("^[-a-z]+://|^(?:cid|data):|^//");

function buildStaticPath(pathRoot: string) {
  return (source: string) => {
    if (URI_RE.test(source)) {
      return source;
    } else {
      return urlPathJoin(pathRoot, source);
    }
  };
}

function buildPathTo(pathRoot: string) {
  return (source: string | PageType) => {
    if (isString(source)) {
      const strSource = source as string;
      if (URI_RE.test(strSource)) {
        return strSource;
      } else {
        return urlPathJoin(pathRoot, strSource);
      }
    } else if (isObject(source)) {
      const pageSource = source as PageType;
      return urlPathJoin(pathRoot, pageSource.urlPath);
    } else {
      throw new TypeError(`Expected string or page object, received '${source}'`);
    }
  };
}

function constructUrlPath(projectPagesPath: string, filePath: string) {
  const relativeFilePath = path.relative(projectPagesPath, filePath);

  let urlPath = relativeFilePath;

  // Remove supported extensions (.ejs and .md), e.g.:
  //
  //     foo/bar.js      => foo/bar.js
  //     foo/bar.ejs     => foo/bar
  //     foo/bar.md      => foo/bar
  //     foo/bar.baz.ejs => foo/bar.baz
  //
  urlPath = urlPath.replace(/\.md$|\.ejs$/, "");

  // urlPath should be the full path of the url, so ensure a '/' prefix
  urlPath = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;

  // If the file is an 'index' file, then omit 'index'
  urlPath = path.basename(urlPath) === "index" ? path.dirname(urlPath) : urlPath;

  return urlPath;
}

function isMarkdown(page: PageType) {
  return path.extname(page.filePath) === ".md";
}

function isAppYaml(projectPath: string, filePath: string) {
  const relativePath = path.relative(projectPath, filePath);
  return relativePath === "app.yaml";
}

function isLayout(projectPath: string, filePath: string) {
  const relativePath = path.relative(projectPath, filePath);
  return /^layouts\/.+/.test(relativePath);
}

function isPage(projectPath: string, filePath: string) {
  const relativePath = path.relative(projectPath, filePath);
  return /^pages\/.+/.test(relativePath);
}

function constructLayout(projectLayoutsPath: string, file: FileType): LayoutType {
  const name = path.relative(projectLayoutsPath, file.filePath).replace(/\.ejs$/, "");
  return Object.freeze({ name, filePath: file.filePath, contents: file.contents });
}

function constructPage(projectPagesPath: string, file: FileType): PageType {
  const filePath = file.filePath;
  const urlPath = constructUrlPath(projectPagesPath, file.filePath);
  const [context, contents] = fm.parse(file.contents);
  context.urlPath = urlPath;
  return Object.freeze({ filePath, urlPath, contents, context });
}

async function readApp(filePath: string) {
  const appFile = await fs.read(filePath);
  return loadYamlObject(appFile.contents);
}

async function readLayout(projectLayoutsPath: string, filePath: string) {
  const layoutFile = await fs.read(filePath);
  return constructLayout(projectLayoutsPath, layoutFile);
}

async function readPage(projectPagesPath: string, filePath: string) {
  const pageFile = await fs.read(filePath);
  return constructPage(projectPagesPath, pageFile);
}

async function readAllLayouts(projectLayoutsPath: string, layoutPaths: string[]) {
  const promises = layoutPaths.map((filePath) => readLayout(projectLayoutsPath, filePath));
  return Promise.all(promises);
}

async function readAllPages(projectPagesPath: string, pagesPath: string[]) {
  const promises = pagesPath.map((filePath) => readPage(projectPagesPath, filePath));
  return Promise.all(promises);
}

interface PageRenderOptions {
  urlPathPrefix: string;
}

function renderPage(
  page: PageType,
  appContext: ObjectType,
  layouts: LayoutType[],
  pages: PageType[],
  options: PageRenderOptions
) {
  const context: ContextType = shallowMerge(appContext, page.context, {
    staticPath: buildStaticPath(options.urlPathPrefix),
    pathTo: buildPathTo(options.urlPathPrefix),
    pages: pages.map((page) => page.context),
  });

  context.body = ejs.render(page.contents, context);

  if (isMarkdown(page)) {
    context.body = marked(context.body);
  }

  const layoutName = page.context.layout || appContext.layout;
  const layout = layouts.find((layout) => layout.name === layoutName);
  if (!layout) {
    throw new Error(`${layoutName} layout doesn't exist`);
  }

  return ejs.render(layout.contents, context);
}

interface NewCmdArgvType {
  path: string;
}

async function cmdNew(argv: NewCmdArgvType) {
  const projectPath = path.resolve(argv.path);
  const projectName = path.basename(projectPath);

  await Promise.all([
    fs.mkdirp(path.join(projectPath, "static")),
    fs.mkdirp(path.join(projectPath, "layouts")),
    fs.mkdirp(path.join(projectPath, "pages")),
  ]);

  await templates.default.create(projectPath, projectName);
}

interface ServeCmdArgvType {
  path: string;
  port: number;
}

async function cmdServe(argv: ServeCmdArgvType) {
  const chokidar = require("chokidar");

  const projectPath = path.resolve(argv.path);

  const projectAppPath = path.join(projectPath, "app.yaml");
  if (!(await fs.exists(projectAppPath))) {
    console.error(`Cannot find app.yaml at ${projectAppPath}`);
    process.exit(1);
  }

  const projectLayoutsPath = path.join(projectPath, "layouts");
  if (!(await fs.exists(projectLayoutsPath))) {
    console.error(`Cannot find layouts at ${projectLayoutsPath}`);
    process.exit(1);
  }

  const projectPagesPath = path.join(projectPath, "pages");
  if (!(await fs.exists(projectPagesPath))) {
    console.error(`Cannot find pages at ${projectPagesPath}`);
    process.exit(1);
  }

  const syte: SyteType = {
    app: {},
    layouts: [],
    pages: [],
  };

  const watcher = chokidar.watch([
    `${projectPath}/app.yaml`,
    `${projectPath}/layouts/**/*.ejs`,
    `${projectPath}/pages/**/*.(ejs|md)`,
  ]);

  watcher.on("add", async (filePath: string) => {
    if (isAppYaml(projectPath, filePath)) {
      const newApp = await readApp(filePath);
      syte.app = newApp;
    } else if (isLayout(projectPath, filePath)) {
      const newLayout = await readLayout(projectLayoutsPath, filePath);
      syte.layouts.push(newLayout);
    } else if (isPage(projectPath, filePath)) {
      const newPage = await readPage(projectPagesPath, filePath);
      syte.pages.push(newPage);
    }
  });

  watcher.on("change", async (filePath: string) => {
    if (isAppYaml(projectPath, filePath)) {
      const updatedApp = await readApp(filePath);
      syte.app = updatedApp;
    } else if (isLayout(projectPath, filePath)) {
      const updatedLayout = await readLayout(projectLayoutsPath, filePath);
      syte.layouts = syte.layouts.map((layout) => {
        return layout.filePath === updatedLayout.filePath ? updatedLayout : layout;
      });
    } else if (isPage(projectPath, filePath)) {
      const updatedPage = await readPage(projectPagesPath, filePath);
      syte.pages = syte.pages.map((page) => {
        return page.filePath === updatedPage.filePath ? updatedPage : page;
      });
    }
  });

  watcher.on("unlink", async (filePath: string) => {
    if (isLayout(projectPath, filePath)) {
      syte.layouts = syte.layouts.filter((lf) => {
        return lf.filePath !== filePath;
      });
    } else if (isPage(projectPath, filePath)) {
      syte.pages = syte.pages.filter((p) => {
        return p.filePath !== filePath;
      });
    }
  });

  server.serve(argv.port, async (url) => {
    const urlPath = url.pathname === "/" ? url.pathname : url.pathname.replace(/\/+$/, "");
    const page = syte.pages.find((page) => page.urlPath === urlPath);
    if (page !== undefined) {
      const body = renderPage(page, syte.app, syte.layouts, syte.pages, { urlPathPrefix: "/" });
      return [200, { "Content-Type": "text/html" }, body];
    }

    const staticFilePath = path.join(projectPath, "static", url.pathname);
    if (await fs.exists(staticFilePath)) {
      const file = await fs.read(path.join(projectPath, "static", url.pathname));
      return [200, {}, file.contents];
    }

    return [404, {}, "Not Found"];
  });
}

interface BuildCmdArgvType {
  path: string;
  outputPath: string;
  urlPathPrefix: string;
}

async function cmdBuild(argv: BuildCmdArgvType) {
  const projectPath = path.resolve(argv.path);

  const projectAppPath = path.join(projectPath, "app.yaml");
  if (!(await fs.exists(projectAppPath))) {
    console.error(`Cannot find app context at ${projectAppPath}`);
    process.exit(1);
  }
  const appContext = await readApp(projectAppPath);

  const projectLayoutsPath = path.join(projectPath, "layouts");
  const layoutPaths = await fs.glob(`${projectLayoutsPath}/**/*.ejs`);
  if (layoutPaths.length === 0) {
    console.error(`Cannot find layouts at ${projectLayoutsPath}`);
    process.exit(1);
  }
  const layouts = await readAllLayouts(projectLayoutsPath, layoutPaths);

  const projectPagesPath = path.join(projectPath, "pages");
  const pagePaths = await fs.glob(`${projectPagesPath}/**/*.(ejs|md)`);
  if (pagePaths.length === 0) {
    console.error(`Cannot find pages at ${projectPagesPath}`);
    process.exit(1);
  }
  const pages = await readAllPages(projectPagesPath, pagePaths);

  const outputPath = path.resolve(argv.outputPath);
  await fs.mkdirp(outputPath);

  const buildPages = () => {
    return pages.map(async (page) => {
      const pageContents = renderPage(page, appContext, layouts, pages, argv);
      const pageOutputDirPath = path.join(outputPath, page.urlPath);
      await fs.mkdirp(pageOutputDirPath);
      const filePath = path.join(pageOutputDirPath, "index.html");
      await fs.write(filePath, pageContents);
    });
  };

  const copyStatic = () => {
    const source = path.join(projectPath, "static");
    const destination = path.join(outputPath);
    return fs.copy(source, destination);
  };

  await Promise.all([copyStatic(), ...buildPages()]);
}

export default {
  new: cmdNew,
  serve: cmdServe,
  build: cmdBuild,
};

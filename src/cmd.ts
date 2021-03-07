import path from "path";
import ejs from "ejs";
import marked from "marked";
import templates from "./templates";
import { shallowMerge } from "./utils";
import fs from "./fs";
import { ContextType } from "./types";
import page from "./page";
import userData from "./user_data";
import syte from "./syte";

interface NewCmdArgvType {
  path: string;
}

async function cmdNew(argv: NewCmdArgvType) {
  const projectPath = path.resolve(argv.path);
  const projectName = path.basename(projectPath);

  await Promise.all([
    fs.mkdirp(path.join(projectPath, "assets")),
    fs.mkdirp(path.join(projectPath, "layouts")),
    fs.mkdirp(path.join(projectPath, "pages")),
  ]);

  await templates.default.create(projectPath, projectName);
}

interface BuildCmdArgvType {
  path: string;
  outputPath: string;
  environment: string;
}

async function cmdBuild(argv: BuildCmdArgvType) {
  const projectPath = path.resolve(argv.path);

  const appContextPath = path.join(projectPath, "app.json");
  if (!(await fs.exists(appContextPath))) {
    console.error(`Cannot find app context at ${appContextPath}`);
    process.exit(1);
  }
  const appContextStr = await fs.read(appContextPath);
  const appContext = JSON.parse(appContextStr);
  const appData = userData.create(appContext);

  const layoutsPath = path.join(projectPath, "layouts");
  const layoutPaths = await fs.glob(`${layoutsPath}/**/*.ejs`);
  if (layoutPaths.length === 0) {
    console.error(`Cannot find layouts at ${layoutsPath}`);
    process.exit(1);
  }
  const layoutFiles = await fs.readAll(layoutPaths);

  const projectPagesPath = path.join(projectPath, "pages");
  const pagePaths = await fs.glob(`${projectPagesPath}/**/*.(ejs|md)`);
  if (pagePaths.length === 0) {
    console.error(`Cannot find pages at ${projectPagesPath}`);
    process.exit(1);
  }
  const pageFiles = await fs.readAll(pagePaths);
  const pages = pageFiles.map((pageFile) => {
    return page.create(projectPagesPath, pageFile);
  });

  const outputPath = path.resolve(argv.outputPath);
  await fs.mkdirp(outputPath);

  const buildPages = () => {
    return pages.map(async (pageData) => {
      const context: ContextType = shallowMerge(appData.context, pageData.context, {
        $: syte(
          pages,
          argv.environment,
          argv.environment === "development" ? path.join(projectPath, "assets") : "/assets"
        ),
      });

      if (page.isMarkdown(pageData)) {
        const compiledPageContents = marked(pageData.contents);
        context.$.body = compiledPageContents;
      } else if (page.isEjs(pageData)) {
        const compiledPageContents = ejs.render(pageData.contents, context, {
          rmWhitespace: true,
        });
        context.$.body = compiledPageContents;
      }

      const layoutName = pageData.config.layout || appData.config.layout;
      const layoutFile = layoutFiles.find((f) => {
        const relativePath = path.relative(layoutsPath, f.path).replace(/\.ejs$/, "");
        return relativePath === layoutName;
      });
      if (!layoutFile) {
        throw new Error(`${layoutName} layout doesn't exist`);
      }

      const pageContents = ejs.render(layoutFile.contents, context, { rmWhitespace: true });

      const pageOutputDirPath = path.join(outputPath, pageData.urlPath);
      await fs.mkdirp(pageOutputDirPath);

      const filePath = path.join(pageOutputDirPath, "index.html");
      await fs.write(filePath, pageContents);
    });
  };

  const copyStaticAssets = () => {
    const source = path.join(projectPath, "assets");
    const destination = path.join(outputPath, "assets");
    return fs.copy(source, destination);
  };

  await Promise.all([copyStaticAssets(), ...buildPages()]);
}

export default {
  new: cmdNew,
  build: cmdBuild,
};

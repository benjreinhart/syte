import path from "path";
import ejs from "ejs";
import marked from "marked";
import templates from "./templates";
import { shallowMerge } from "./utils";
import fs from "./fs";
import { ContextType } from "./types";
import page from "./page";

interface NewCmdArgvType {
  path: string;
}

async function cmdNew(argv: NewCmdArgvType) {
  const projectPath = path.resolve(argv.path);
  const projectName = path.basename(projectPath);

  await Promise.all([
    fs.mkdirp(path.join(projectPath, "pages")),
    fs.mkdirp(path.join(projectPath, "layouts")),
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

  const layoutPath = path.join(projectPath, "layouts", "app.ejs");
  if (!(await fs.exists(layoutPath))) {
    console.error(`Cannot find app layout at ${layoutPath}`);
    process.exit(1);
  }
  const layout = await fs.read(layoutPath);

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

  for await (const pageObject of pages) {
    const context: ContextType = shallowMerge(appContext, pageObject.context, {
      $: { pages: pages, environment: argv.environment },
    });

    if (page.isMarkdown(pageObject)) {
      const compiledPageContents = marked(pageObject.contents);
      context.$.body = compiledPageContents;
    } else if (page.isEjs(pageObject)) {
      const compiledPageContents = ejs.render(pageObject.contents, context, {
        rmWhitespace: true,
      });
      context.$.body = compiledPageContents;
    }

    const pageOutputDirPath = path.join(outputPath, pageObject.urlPath);
    await fs.mkdirp(pageOutputDirPath);

    const filePath = path.join(pageOutputDirPath, "index.html");
    const pageContents = ejs.render(layout, context, { rmWhitespace: true });
    await fs.write(filePath, pageContents);
  }
}

export default {
  new: cmdNew,
  build: cmdBuild,
};

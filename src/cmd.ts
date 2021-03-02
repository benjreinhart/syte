import path from "path";
import ejs from "ejs";
import marked from "marked";
import templates from "./templates";
import { shallowMerge } from "./utils";
import fs from "./fs";
import { ContextType } from "./types";
import PageFile from "./PageFile";

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
  const pageFiles = pagePaths.map((absoluteFilePath) => {
    return new PageFile(projectPagesPath, absoluteFilePath);
  });
  const pageFileLoads = pageFiles.map((pf) => pf.load());
  await Promise.all(pageFileLoads);

  const pagesContextsByUrlPath = pageFiles.reduce((accum, pageFile) => {
    accum[pageFile.urlPath] = shallowMerge(pageFile.context, { urlPath: pageFile.urlPath });
    return accum;
  }, {} as { [urlPath: string]: object });
  const pageContexts = Object.values(pagesContextsByUrlPath);

  const outputPath = path.resolve(argv.outputPath);
  await fs.mkdirp(outputPath);

  for await (const pageFile of pageFiles) {
    const pageContext = pagesContextsByUrlPath[pageFile.urlPath];

    const context: ContextType = shallowMerge(appContext, pageContext, {
      $: { pages: pageContexts, environment: argv.environment },
    });

    if (pageFile.isMarkdown()) {
      const compiledPageContents = marked(pageFile.contents);
      context.$.body = compiledPageContents;
    } else if (pageFile.isEjs()) {
      const compiledPageContents = ejs.render(pageFile.contents, context, {
        rmWhitespace: true,
      });
      context.$.body = compiledPageContents;
    }

    const pageOutputDirPath = path.join(outputPath, pageFile.urlPath);
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

import path from "path";
import ejs from "ejs";
import marked from "marked";
import siteJsonTemplate from "./templates/site.json";
import indexMdTemplate from "./templates/index.md";
import layoutEjsTemplate from "./templates/layout.ejs";
import { ejsEscapeFn, htmlSafe } from "./utils";
import fs from "./fs";
import { ContextType } from "./types";
import Page from "./Page";

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

  const filesToCreate = {
    "site.json": siteJsonTemplate({ title: projectName }),
    [`layouts${path.sep}main.ejs`]: layoutEjsTemplate(),
    [`pages${path.sep}index.md`]: indexMdTemplate(),
  };

  await Promise.all(
    Object.entries(filesToCreate).map(async ([fileName, template]) => {
      const filePath = path.join(projectPath, fileName);
      if (!(await fs.exists(filePath))) {
        await fs.write(filePath, template);
      }
    })
  );
}

interface BuildCmdArgvType {
  path: string;
  outputPath: string;
}

async function cmdBuild(argv: BuildCmdArgvType) {
  const projectPath = path.resolve(argv.path);

  const siteContextPath = path.join(projectPath, "site.json");
  if (!(await fs.exists(siteContextPath))) {
    console.error(`Cannot find site context at ${siteContextPath}`);
    process.exit(1);
  }
  const siteContextStr = await fs.read(path.join(projectPath, "site.json"));
  const siteContext = JSON.parse(siteContextStr);

  const layoutPath = path.join(projectPath, "layouts", "main.ejs");
  if (!(await fs.exists(layoutPath))) {
    console.error(`Cannot find main layout at ${layoutPath}`);
    process.exit(1);
  }
  const layout = await fs.read(layoutPath);

  const projectPagesPath = path.join(projectPath, "pages");
  const pagePaths = await fs.glob(`${projectPagesPath}/**/*.(ejs|md)`);
  if (pagePaths.length === 0) {
    console.error(`Cannot find pages at ${projectPagesPath}`);
    process.exit(1);
  }
  const pages = pagePaths.map((absoluteFilePath) => {
    return new Page(projectPagesPath, absoluteFilePath);
  });

  const outputPath = path.resolve(argv.outputPath);
  await fs.mkdirp(outputPath);

  for await (const page of pages) {
    const pageContext = await page.context();
    const rawPageContents = await page.contents();

    const context: ContextType = {
      site: siteContext,
      pages: pages,
      body: "",
      page: pageContext,
    };

    if (page.isMarkdown()) {
      const compiledPageContents = marked(rawPageContents);
      context.body = htmlSafe(compiledPageContents);
    } else if (page.isEjs()) {
      const compiledPageContents = ejs.render(rawPageContents, context);
      context.body = htmlSafe(compiledPageContents);
    }

    const pageOutputDirPath = path.join(outputPath, page.relativeOutputDirPath);
    await fs.mkdirp(pageOutputDirPath);

    const filePath = path.join(pageOutputDirPath, "index.html");
    const pageContents = ejs.render(layout, context, { escape: ejsEscapeFn });
    await fs.write(filePath, pageContents);
  }
}

export default {
  new: cmdNew,
  build: cmdBuild,
};

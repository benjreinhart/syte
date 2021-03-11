import path from "path";
import fs from "../../fs";
import yaml from "js-yaml";

function appContext(projectName: string, layoutName: string) {
  return yaml.dump({
    layout: layoutName,
    title: projectName,
  });
}

function appCss() {
  return `* {
  box-sizing: border-box;
}
`;
}

function appLayout() {
  return `<!DOCTYPE html>
<html lang="en-us">
  <head>
    <title><%= title %></title>
    <link href="<%= assetPath("app.css") %>" rel="stylesheet">
  </head>
  <body>
    <%- body %>
  </body>
</html>
`;
}

function indexPage() {
  return `---
title: Index Page
---
# Index page

This is your syte. It has <%= pages.length %> page(s).

Navigation:
<% for (const page of pages) { _%>
* [<%= page.title || page.urlPath %>](<%= page.urlPath %>)
<% } _%>

## TODO

- [X] Generate syte project
- [ ] Customize generated templates
- [ ] Deploy!
`;
}

async function create(projectPath: string, projectName: string) {
  return Promise.all(
    [
      async () => {
        const appContextPath = path.join(projectPath, "app.yaml");
        if (!(await fs.exists(appContextPath))) {
          await fs.write(appContextPath, appContext(projectName, "app"));
        }
      },
      async () => {
        const appCssPath = path.join(projectPath, "assets", "app.css");
        if (!(await fs.exists(appCssPath))) {
          await fs.write(appCssPath, appCss());
        }
      },
      async () => {
        const appLayoutPath = path.join(projectPath, "layouts", "app.ejs");
        if (!(await fs.exists(appLayoutPath))) {
          await fs.write(appLayoutPath, appLayout());
        }
      },
      async () => {
        const indexPagePath = path.join(projectPath, "pages", "index.md");
        if (!(await fs.exists(indexPagePath))) {
          await fs.write(indexPagePath, indexPage());
        }
      },
    ].map((f) => f())
  );
}

export default { create };

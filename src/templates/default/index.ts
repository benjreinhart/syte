import path from "path";
import fs from "../../fs";

function appData(projectName: string, layoutName: string) {
  const data = {
    layout: layoutName,
    title: projectName,
  };

  return JSON.stringify(data, null, 2);
}

function appLayout() {
  return `<!DOCTYPE html>
<html lang="en-us">
  <head>
    <title><%= title %></title>
  </head>
  <body>
    <%- body %>
  </body>
</html>
`;
}

function indexPage() {
  return `\`\`\`json
{
  "title": "Index Page"
}
\`\`\`
# Index page

This is the index page.

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
        const appDataPath = path.join(projectPath, "app.json");
        if (!(await fs.exists(appDataPath))) {
          await fs.write(appDataPath, appData(projectName, "app"));
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

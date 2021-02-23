export default function generate() {
  return `
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <title><%= page.title || site.title %></title>
  </head>
  <body>
    <%= body %>
  </body>
</html>
`.trim();
}

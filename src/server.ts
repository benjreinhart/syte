import http from "http";

function errorTemplate(method: string, url: string, error: Error) {
  let errorMessage;

  errorMessage = error.stack || String(error);
  errorMessage = errorMessage.replace(/>/g, "&gt;");
  errorMessage = errorMessage.replace(/</g, "&lt;");

  return `
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <title>Syte error</title>
    <style>
      * {
        box-sizing: border-box;
      }
      .code {
        width: 100%;
        background-color: #ccc;
        padding: 24px;
      }
    </style>
  </head>
  <body>
    <h1>Error while serving <code>${method.toUpperCase()} ${url}</code></h1>
    <div class="code">
      <pre><code>${errorMessage}</code></pre>
    </div>
  </body>
</html>
`;
}

function serve(
  port: number,
  render: (req: http.IncomingMessage, res: http.ServerResponse) => void
) {
  const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      render(req, res);
    } catch (e) {
      res.writeHead(500);
      res.end(errorTemplate(req.method as string, req.url as string, e as Error));
    }
  });

  server.listen(port, "localhost", () => {
    console.log(`Your syte is being served at http://localhost:${port}`);
  });
}

export default { serve };

const express = require('express');
const fs = require('fs-extra');
const path = require('path');
let isProduction = process.env.NODE_ENV === 'production';
async function createServer() {
  let app = express();
  /**
   * @type {import("vite").ViteDevServer}
   */
  let vite;
  if (!isProduction) {
    vite = await require('vite').createServer({
      root: process.cwd(),
      server: { middlewareMode: 'ssr' },
    });
    app.use(vite.middlewares);
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      );
      if (!isProduction) {
        template = await vite.transformIndexHtml(url, template);
      }
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).end(template);
    } catch (error) {
      if (!isProduction) vite.ssrFixStacktrace(error);
      console.log(error.stack);
      return res.status(500).end(error.stack);
    }
  });
  return app;
}
createServer().then((app) => {
  app.listen(3000, () => {
    console.log('HTTP server is running at http://localhost:3000');
  });
});

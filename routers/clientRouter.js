const { Router } = require("express");
const path = require('path');

const clientRouter = new Router();

clientRouter.get('/', async (req, res, next) => {
  // res.setHeader('Content-Encoding', 'gzip');
  res.sendFile(path.join(process.cwd(), 'public', 'pages', 'home.html'))
});
clientRouter.get('/about', async (req, res, next) => {
  res.sendFile(path.join(process.cwd(), 'public', 'pages', 'about.html'))
});

module.exports = clientRouter;
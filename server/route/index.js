// server/route/index.js

const router = require('express').Router();
const craw = require('controller/CrawlerController');

router.get('/', (request, response, next) => {
  response.send('Olá!!');
});

router.get('/contato', (request, response, next) => {
  response.status(201);
  response.send('Contato!!');
});

router.use('/teams', require('route/teams'));

router.get('/crawler', craw.cacheMiddleware, craw.craw);

router.use('/auth', require('route/auth'));

module.exports = router;

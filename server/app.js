// server/app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((request, response, next) => {
  console.log(`method: ${request.method}`);
  console.log(`ip: ${request.ip}`);
  console.log(`date: ${new Date()}`);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('route'));

app.use((request, response, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, request, response, next) => {
  const status = err.status || 500;

  response.status(status).json({ status: err.status, message: err.message });

  if (status !== 404) {
    console.log('error: ', err.stack);
  }
});

module.exports = app;

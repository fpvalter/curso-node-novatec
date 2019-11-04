
const env = process.env.NODE_ENV || 'dev';
const config = {
  dev: {
    mongo: {
      uri: 'localhost:32770/novatec',
    },
  },
  test: {
    mongo: {
      uri: 'localhost:32770/novatec-teste',
    },
  },
};
const mongojs = require('mongojs');

const db = mongojs(config[env].mongo.uri);

db.on('error', (err) => {
  console.log(err);
});

module.exports = db;

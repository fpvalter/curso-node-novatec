const axios = require('axios');
const redis = require('config/redis');

const CrawlerController = {

  cacheMiddleware(request, response, next) {
    const { link } = request.query;
    const key = `valter:${encodeURIComponent(link)}`;

    redis.get(key, (err, data) => {
      if (data) {
        console.log('peguei do cache');
        return response.send(data);
      }
      next();
    });
  },

  craw(request, response, next) {
    const { link } = request.query;

    axios.get(link)
      .then((result) => {
        redis.set(`valter:${encodeURIComponent(link)}`, result.data, 'EX', 120);

        response.status(result.status);
        response.send(result.data);
      })
      .catch(next);
  },
};

module.exports = CrawlerController;

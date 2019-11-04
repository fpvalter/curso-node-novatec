const repository = require('repository/TeamRepository');

const TeamController = {

  list(request, response, next) {
    const query = {};

    if (request.query.name) {
      query.name = new RegExp(request.query.name, 'i');
    }

    /* repository.listAsync(query)
            .then( data=> {
                        response.json({
                            itens: data,
                            total: data.length
                })
            }).catch(next); */

    Promise.all([
      repository.listAsync(query),
      repository.countAsync(query),
    ])
      .then(
        (data) => {
          response.json({
            itens: data[0],
            total: data[1],
          });
        },
      ).catch(next);
  },
  getById(request, response, next) {
    const { id } = request.params;
    repository.byId(id, (err, data) => {
      response.json(data);
    });
  },
  create(request, response, next) {
    repository.createAsync(request.body)
      .then((data) => {
        response.status(201).json(data);
      });
  },
  update(request, response, next) {
    const { id } = request.params;
    repository.updateAsync(id, request.body)
      .then((data) => {
        response.json(data);
      }).catch(next);
  },
  delete(request, response, next) {
    const { id } = request.params;
    repository.deleteAsync(id)
      .then((data) => {
        response.sendStatus(204);
      }).catch(next);
  },

};

module.exports = TeamController;

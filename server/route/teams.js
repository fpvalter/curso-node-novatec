const router = require('express').Router();
const TeamController = require('controller/TeamControler');
const jwt = require('middleware/jwt');
const validator = require('middleware/validator');

const mongoIdMiddleware = (request, response, next) => {
  if (request.params.id.length !== 24) {
    const err = new Error('invalid mongo id');
    err.status = 422;
    return next(err);
  }
  next();
};

router.get('/', jwt.verify, TeamController.list);
router.get('/:id', mongoIdMiddleware, TeamController.getById);
router.post('/', validator.userSchema, validator.middleware, TeamController.create);
router.put('/:id', mongoIdMiddleware, TeamController.update);
router.delete('/:id', mongoIdMiddleware, TeamController.delete);

module.exports = router;

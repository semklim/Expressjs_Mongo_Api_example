const { Router } = require("express");
const controller = require('../api/controls/AuthControl');
const { check } = require("express-validator");
const authMiddleware = require('../api/middlewares/authMiddleware');
const apiRouter = new Router();

apiRouter.post('/reg', [
  check('userName', 'Not valid userName').notEmpty(),
  check('password', 'Not Valid password').notEmpty().isLength({ min: 3, max: 10 }),
  check('email', 'Not Valid email').isEmail(),
], controller.registration);
apiRouter.post('/login', controller.login);
apiRouter.post('/logout', controller.logout);
apiRouter.get('/activate/:link', controller.activate);
apiRouter.get('/refresh', controller.refresh);
apiRouter.get('/users', authMiddleware, controller.getUsers);

module.exports = apiRouter;
const express = require('express');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.router');
const authRouter = require('./auth.router');
const eventsRouter = require('./events.router');
const locationRouter = require('./location.router')
const bitacoras = require('./bitacora.router')
const bitacoraEventRouter = require('./bitacora-event.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
  router.use('/events', eventsRouter);
  router.use('/locations', locationRouter);
  router.use('/logs', bitacoras);
  router.use('/bitacora-events',bitacoraEventRouter)

}

module.exports = routerApi;

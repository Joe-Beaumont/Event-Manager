const apiRouter = require("express").Router();
const attendingRouter = require("./attending.router");
const eventRouter = require("./event.router");
const userRouter = require("./user.router");

apiRouter.use('/users', userRouter);
apiRouter.use('/events', eventRouter);
apiRouter.use('/attend', attendingRouter);

module.exports = apiRouter;
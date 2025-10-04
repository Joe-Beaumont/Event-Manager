const eventRouter = require("express").Router({ mergeParams: true });
const attendingRouter = require('./attending.router.js');
const { eventController } = require('../controllers/index.js');

eventRouter.route('/')
.get(eventController.getEvents)
.post(eventController.postEvent)

eventRouter.route('/:event_id')
.get(eventController.getEvent)
.patch(eventController.patchEvent)
.delete(eventController.cancelEvent)

eventRouter.use('/:event_id/attend', attendingRouter);

module.exports = eventRouter;
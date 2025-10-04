const { attendingController } = require("../controllers");
const attendingRouter = require("express").Router({ mergeParams: true });

attendingRouter.route('/')
.post(attendingController.postAttending)
.delete(attendingController.cancelAttending)

attendingRouter.route('/users')
.get(attendingController.getAttending)


module.exports = attendingRouter;
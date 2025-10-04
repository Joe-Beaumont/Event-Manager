const userRouter = require("express").Router();
const { userController } =require('../controllers/index.js');

userRouter.route('/')
.post(userController.postUser)

userRouter.route('/:user_id')
.get(userController.getUser)

module.exports = userRouter;
const userRouter = require("express").Router();
const { userController } =require('../controllers/index.js');

userRouter.route('/')
.post(userController.postUser)
.get(userController.getUserByEmail); 

userRouter.route('/login')
.post(userController.loginUser);

userRouter.route('/:user_id')
.get(userController.getUser)

module.exports = userRouter;
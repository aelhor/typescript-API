import express from 'express'
import  {UserController} from '../controller/user.controller'
const UserRouter = express.Router()

const productController = new UserController();


UserRouter.post('/login', productController.login);
UserRouter.post('/signup', productController.signup);






export default UserRouter

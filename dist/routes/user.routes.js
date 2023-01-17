"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controller/user.controller");
var UserRouter = express_1.default.Router();
var productController = new user_controller_1.UserController();
// 
UserRouter.post('/login', productController.login);
UserRouter.post('/signup', productController.signup);
exports.default = UserRouter;

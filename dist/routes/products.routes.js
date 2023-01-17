"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_controller_1 = require("../controller/products.controller");
var middlewares_1 = require("../utils/middlewares");
var productRouter = express_1.default.Router();
var productController = new products_controller_1.ProductController();
productRouter.get("/", productController.listAllProducst);
productRouter.put("/", middlewares_1.Middlewares.auth, productController.updateProduct);
productRouter.delete("/", middlewares_1.Middlewares.auth, productController.removeProduct);
exports.default = productRouter;

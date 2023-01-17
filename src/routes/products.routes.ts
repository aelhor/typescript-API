import express from "express";
import { ProductController } from "../controller/products.controller";
import { Middlewares } from "../utils/middlewares";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/", productController.listAllProducst);
productRouter.put("/", Middlewares.auth, productController.updateProduct);
productRouter.delete("/", Middlewares.auth, productController.removeProduct);

export default productRouter;

import { Request, Response } from "express";
import { connect } from "../utils/db";

export class ProductController {
  // development endpoint 
  public async listAllProducst(req: Request, res: Response): Promise<void> {
    try {
      const db = await connect();

      const products = await db.query("SELECT * FROM products");
      res.status(200).send(products[0]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error listing all products" });
    }
  }

  public async updateProduct(req: any, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id

      const { id, title, image, price } = req.body;
      const db = await connect();

      // check if the product belongs to the user
      const checkQuery = "SELECT * FROM products WHERE id = ? ";
      const product = (await db.query(checkQuery, [id])) as any;


      if (!Array.isArray(product) || product[0].length === 0) {
        return res.status(404).send("Product not found");
      }
      if (product[0][0].user_id != user_id) {
        return res.status(401).send("Not allowed to update this product");
      }
      // update the product
      const updateQuery =
        "UPDATE products SET title = ?, image = ?, price = ? WHERE id = ?";

      await db.query(updateQuery, [
        title || product[0][0].title,
        image || product[0][0].image,
        price || product[0][0].price,
        id,
      ]);
      return res.send("Product updated");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  public async removeProduct(req: any, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id

      const { id } = req.body;
      const db = await connect();

      // check if the product belongs to the user
      const checkQuery = "SELECT * FROM products WHERE id = ? ";
      const product = (await db.query(checkQuery, [id])) as any;

      if (!Array.isArray(product) || product[0].length === 0) {
        return res.status(404).send("Product not found");
      }
      if (product[0][0].user_id != user_id) {
        return res.status(401).send("Not allowed to delete this product");
      }

      const removeQuery = "DELETE FROM products WHERE id = ?";
      await db.query(removeQuery, [id]);
      return res.send("Product Deleted");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
}

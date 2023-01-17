import { Response, Request } from "express";
import { connect } from "../utils/db";
import bcrypt from "bcrypt";
import { User } from "../models.ts/user.model";

import { JWT } from "../utils/jwt";

export class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).send("Email and Password are Required");
      }

      const db = await connect();
      const email = req.body.email;
      const password = req.body.password;

      const sqlQuery = "SELECT * FROM users WHERE email = ?";

      const [rows] = (await db.query(sqlQuery, [email])) as any;
      if (!Array.isArray(rows) || rows.length === 0) {
        return res.status(401).send("Invalid Email or password");
      }

      const user = new User(rows[0]);
      // compare pass
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).send("Invalid password");
      }

      // generate token
      const jwt = new JWT();
      const token = jwt.generateToken({ id: user.id, email: user.email });

      return res.status(200).json({ email: user.email, token: token });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  public async signup(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).send("Name, Email and Password are Required");
      }

      const db = await connect();
      const { email, password, name } = req.body;
      // check if email already exist
      const sqlQuery = "SELECT * FROM users WHERE email = ?";
      const [rows] = (await db.query(sqlQuery, [email])) as any;
      if (rows.length !== 0) {
        return res.status(401).send("Email aleady exist");
      }
      // Hash the pass
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = `INSERT INTO users (name, email, password) VALUES (?,?,?)`;
      // insert the user 
      await db.query(insertQuery, [name, email, hashedPassword]);

      // get the created user info 
      const createdUser = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      // generate a token
      const user = new User(createdUser[0]);
      const jwt = new JWT();
      const token = jwt.generateToken({ id: user.id, email: user.email });

      return res.status(201).send({ message: "User created", token: token });

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

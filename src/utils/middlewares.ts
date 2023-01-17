import { Request, Response, NextFunction } from "express";
import {JWT} from "./jwt";

export class Middlewares {
    static async auth(req: any, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Token is required" });
            }

            const jwt = new JWT();
            const decoded = jwt.verifyToken(token);

            if (!decoded) {
                return res.status(401).json({ message: "Token is invalid" });
            }
            req.user = decoded;
            next();
            
        } catch (err) {
            return res.status(401).json(err);
        }
    }
}

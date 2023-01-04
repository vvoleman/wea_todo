import {Request, Response} from "express"
import AbstractMiddleware from "@/base/abstract/AbstractMiddleware"
import Logger from "@/services/Logger"
import jwt, {JwtPayload} from "jsonwebtoken";
import JWTGenerator from "@/services/JWTGenerator";

export interface UserTokenInfo {
    id: number;
    email: string;
}

export interface LoggedInRequest extends Request {
    user: string | JwtPayload
}

export default class UserLoggedMiddleware extends AbstractMiddleware {
    handle(req: LoggedInRequest, res: Response, next: Function): void {
        const token = req.cookies.token;

        if (!token) {
            res.status(403).send({
                message: "No token provided."
            })
            return
        }

        try {
            req.user = JWTGenerator.getInstance().verifyToken(token);
            next()
        }
        catch (err) {
            res.status(401).send({
                message: "Unauthorized"
            })
            return
        }
    }

}
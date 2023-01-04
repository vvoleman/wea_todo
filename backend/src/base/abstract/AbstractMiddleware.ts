import express, {Request, Response} from "express";
import Logger from "@/services/Logger";


export default abstract class AbstractMiddleware {
    public abstract handle(req: Request, res: Response, next: Function): void;

    public getExpressMiddleware(): express.RequestHandler {
        Logger.instance.info(`Calling middleware ${this.constructor.name}`);
        return (req: Request, res: Response, next: Function) => {
            console.log('Middleware')
            this.handle(req, res, next);
        }
    }

    protected errorResponse(res: Response, message: string, statusCode: number = 500): void {
        res.status(statusCode).json({
            error: message
        });
    }
}
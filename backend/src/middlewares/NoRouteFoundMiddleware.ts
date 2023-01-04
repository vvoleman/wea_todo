import AbstractMiddleware from "@/base/abstract/AbstractMiddleware";
import express from "express";

export default class NoRouteFoundMiddleware extends AbstractMiddleware {

    handle(req: express.Request, res: express.Response, next: Function): void {
        res.status(404).send({
            message: "Not found"
        })
    }

}
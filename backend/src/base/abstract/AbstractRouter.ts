import express, {Request, RequestHandler, Response} from 'express';
import Route from "@/base/interfaces/object/Route";
import IController from "@/base/interfaces/IController";
import AbstractResponse from "@/base/abstract/AbstractResponse";
import HttpMethod from "@/base/enums/HttpMethod";
import pino from "pino";

abstract class AbstractRouter {

    public abstract getRoutes(): Array<Route>;

    public getRoutePrefix(): string {
        return ''
    }

    public getExpressRouter(): express.Router {
        const router = express.Router()
        const routes = this.getRoutes()
        let prefixPath = this.getRoutePrefix()

        if (prefixPath[prefixPath.length - 1] === '/') {
            prefixPath = prefixPath.slice(0, -1)
        }

        for (const route of routes) {
            let path = route.path
            if (path[0] !== '/') {
                path = '/' + path
            }

            route.path = prefixPath + route.path
            AbstractRouter.addRouteToRouter(route, router)
        }

        return router
    }

    private static addRouteToRouter(route: Route, router: express.Router): void {
        const controller = route.controller
        const action = route.action
        const allMethodsOfClass = Object.getOwnPropertyNames(Object.getPrototypeOf(route.controller))

        // Check if the action is a method of the controller
        if (!allMethodsOfClass.includes(action)) {
            // If not, throw an error
            throw new Error(`The action ${action} is not a method of the controller ${controller.constructor.name}`)
        }


        // Try to call the method route.action on the route.controller and pass the params
        AbstractRouter.addExpressRouteCallback(route, router, async (req: Request, res: Response, controller: IController) => {
            // call the method on the controller
            const params = req.params
            // @ts-ignore
            let response: AbstractResponse | Promise<AbstractResponse> = controller[action](req, res, params)

            if (response instanceof Promise) {
                response = await response
            }

            res
                .status(response.getStatusCode())
                .contentType(response.getContentType())
                .send(response.getContent())
        })
    }

    private static addExpressRouteCallback(route: Route, router: express.Router, handleFunction: Function): void {
        let method = route.httpMethod
        if (method === undefined) {
            method = HttpMethod.GET
        }
        const methodString: string = method.toLowerCase()

        // Check if the method is what we want
        if (route.httpMethod !== method) {
            // If not, throw an error
            throw new Error(`The method ${method} is not supported for route ${route.path}`)
        }

        const handle = (req: Request, res: Response) => {
            handleFunction(req, res, route.controller)
        }

        let middleware: Array<RequestHandler> = []
        if (route.middleware === undefined) {
            middleware = []
        } else {
            for (const middlewareElement of route.middleware) {
                middleware.push(middlewareElement.getExpressMiddleware())
            }
        }

        middleware.push(handle)

        switch (methodString) {
            case 'get':
                router.get(route.path, ...middleware)
                break;
            case 'post':
                router.post(route.path, ...middleware)
                break;
            case 'delete':
                router.delete(route.path, ...middleware)
                break;
            case 'patch':
                router.patch(route.path, ...middleware)
                break;
            case 'options':
                router.options(route.path, ...middleware)
                break;
            case 'head':
                router.head(route.path, ...middleware)
                break;
            case 'trace':
                router.trace(route.path, ...middleware)
                break;
            case 'connect':
                router.connect(route.path, ...middleware)
                break;
        }

    }
}

export default AbstractRouter
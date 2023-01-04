import AbstractRouter from "@/base/abstract/AbstractRouter";
import Route from "@/base/interfaces/object/Route";
import HttpMethod from "@/base/enums/HttpMethod";
import UserLoggedMiddleware from "@/middlewares/UserLoggedMiddleware";
import TaskController from "@/modules/task/controllers/TaskController";

export default class TaskRouter extends AbstractRouter {


    getRoutePrefix(): string {
        return '/task'
    }

    getRoutes(): Array<Route> {
        return [
            {
                path: '/',
                httpMethod: HttpMethod.GET,
                controller: new TaskController(),
                action: 'index',
                middleware: [
                    new UserLoggedMiddleware()
                ]
            },
            {
                path: '/',
                httpMethod: HttpMethod.POST,
                controller: new TaskController(),
                action: 'create',
                middleware: [
                    new UserLoggedMiddleware()
                ]
            },
            {
                path: '/',
                httpMethod: HttpMethod.PATCH,
                controller: new TaskController(),
                action: 'update',
                middleware: [
                    new UserLoggedMiddleware()
                ]
            },
            {
                path: '/',
                httpMethod: HttpMethod.DELETE,
                controller: new TaskController(),
                action: 'delete',
                middleware: [
                    new UserLoggedMiddleware()
                ]
            },
        ];
    }

}

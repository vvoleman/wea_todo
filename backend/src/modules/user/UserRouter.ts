import AbstractRouter from "@/base/abstract/AbstractRouter";
import Route from "@/base/interfaces/object/Route";
import UserController from "@/modules/user/controllers/UserController";
import HttpMethod from "@/base/enums/HttpMethod";

class UserRouter extends AbstractRouter {


    getRoutePrefix(): string {
        return '/user'
    }

    getRoutes(): Array<Route> {
        return [
            {
                path: '/',
                httpMethod: HttpMethod.GET,
                controller: new UserController(),
                action: 'index',
                middleware: [
                ]
            },
            {
                path: '/signup',
                httpMethod: HttpMethod.POST,
                controller: new UserController(),
                action: 'signUp',
                middleware: [
                ]
            },
            {
                path: '/signin',
                httpMethod: HttpMethod.POST,
                controller: new UserController(),
                action: 'signIn',
                middleware: [
                ]
            },
            {
                path: '/signout',
                httpMethod: HttpMethod.POST,
                controller: new UserController(),
                action: 'signOut',
                middleware: [
                ]
            }
        ];
    }

}

export default UserRouter
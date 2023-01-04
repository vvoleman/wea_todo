import IController from "@/base/interfaces/IController";
import HttpMethod from "@/base/enums/HttpMethod";
import AbstractMiddleware from "@/base/abstract/AbstractMiddleware";

interface Route {
    path: string;
    controller: IController;
    action: string;
    httpMethod?: HttpMethod;
    middleware?: Array<AbstractMiddleware>;
}

export default Route
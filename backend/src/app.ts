import express from 'express';
import UserRouter from "@/modules/user/UserRouter";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import DB from "@/services/DB";
import bodyParser from "body-parser";
import TaskRouter from "@/modules/task/TaskRouter";
import Logger from "@/services/Logger";
import ContentType from "@/base/enums/ContentType";
import NoRouteFoundMiddleware from "@/middlewares/NoRouteFoundMiddleware";
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config({
    path: path.join(__dirname, '../../.env')
})

DB.getInstance()

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

let key = process.env.SESSION_SECRET

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: process.env.SESSION_SECRET ?? 'qpwkn,anvo+23avmqo',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}))

app.use(bodyParser.json())
app.use(cookieParser());

const routers = [
    new UserRouter(),
    new TaskRouter()
];

const urlPrefix = process.env.URL_PREFIX ?? ''
for (const router of routers) {
    app.use(urlPrefix, router.getExpressRouter())
}
// No route found
app.use(new NoRouteFoundMiddleware().getExpressMiddleware())


// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    Logger.instance.error(err.stack)

    res.status(500).send({
        message: "Error occured while handling your request"
    }).contentType(ContentType.JSON)
})


export default app;

import pino from "pino";
import * as Path from "path";

export default class Logger {

    private static _instance: pino.Logger;

    public static get instance(): pino.Logger {
        if (!this._instance) {
            this.init()
        }
        return this._instance;
    }

    private static init(): void {

        // set destionation folder to /logs

        this._instance = pino({
            transport: {
                target: 'pino-pretty',
            },
            level: 'info',
            base: null,
            timestamp: () => `,"time":"${new Date().toISOString()}"`
        }, pino.destination(Path.resolve(__dirname, '../../logs/logs.log')),);

    }
}
import {Sequelize} from "sequelize";
import Logger from "@/services/Logger";
import dotenv from "dotenv";

export interface DBParams {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
}

export default class DB {
    private static instance: Sequelize;

    public static getInstance(): Sequelize {
        if (!this.instance) {
            const params = this.getParams()
            this.instance = new Sequelize(`postgres://${params.username}:${params.password}@${params.host}:${params.port}/${params.database}`)
            this.instance.authenticate().then(r => {
                console.log('Connection has been established successfully.');
                Logger.instance.info('Connection has been established successfully.')
            })
                .catch(err => {
                    console.log(err)
                    Logger.instance.error('Unable to connect to the database:', err);
                })
        }
        return this.instance
    }

    private static getParams(): DBParams {
        dotenv.config()
        return {
            host: process.env.DB_HOST ?? 'postgres',
            port: process.env.DB_PORT ?? '5432',
            username: process.env.DB_USERNAME ?? 'postgres',
            password: process.env.DB_PASSWORD ?? '',
            database: process.env.DB_DATABASE ?? 'postgres'
        }
    }
}
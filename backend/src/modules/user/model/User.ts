// setup sequelize model

import {DataTypes, HasManyGetAssociationsMixin, Model} from "sequelize";
import DB from "@/services/DB";
import Task from "@/modules/task/model/Task";
import TaskRepository from "@/modules/task/repository/TaskRepository";

export interface UserData {
    id: number;
    email: string;
    createdAt: Date;
}

export default class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public getTasks!: HasManyGetAssociationsMixin<Task>;

    public getPublicData(): UserData {
        return {
            id: this.id,
            email: this.email,
            createdAt: this.createdAt,
        }
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: "user",
    sequelize: DB.getInstance(),
    underscored: true,
    updatedAt: false,
});
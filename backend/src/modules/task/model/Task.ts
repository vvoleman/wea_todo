// create sequelize model for task. Task has a foreign key to user

import {BelongsToGetAssociationMixin, DataTypes, Model} from "sequelize";
import DB from "@/services/DB";
import User from "@/modules/user/model/User";

export default class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly completedAt!: Date;
    public readonly updatedAt!: Date;
    public getUser!: BelongsToGetAssociationMixin<User>
}

Task.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    text: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: "task",
    sequelize: DB.getInstance(),
    underscored: true,
});

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });
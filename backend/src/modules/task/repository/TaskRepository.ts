import Task from "@/modules/task/model/Task";
import {Op} from "sequelize";
import md5 from "md5";

export interface ITask {
    title: string;
    text: string;
    userId: number;
    completedAt?: Date|null;
}

export interface ITaskDelete {
    taskId: number;
    userId: number;
}

export interface IFilter {
    ownerId: number;
    title?: string;
    isDone?: boolean;
    sortBy?: SortBy;
}

export enum SortBy {
    TITLE = 'title',
    CREATED_AT = 'createdAt',
    COMPLETED_AT = 'completedAt',
}

export default class TaskRepository {

    public async create(task: ITask): Promise<Task> {
        // @ts-ignore
        return Task.create(task);
    }

    public static async tasksHash(userId: number): Promise<string> {
        const tasks = await Task.findAll({
            where: {
                userId: userId,
            }
        });
        return md5(tasks.map((task) => task.id+''+task.updatedAt.toDateString()).join());
    }

    public async findAll(): Promise<Task[]> {
        return Task.findAll();
    }

    public async findOne(id: number): Promise<Task | null> {
        return Task.findOne({
            where: {
                id: id,
            }
        });
    }

    public async update(id: number, task: ITask): Promise<Task | null> {
        const taskToUpdate = await this.findOne(id);
        if (taskToUpdate) {
            // @ts-ignore
            return taskToUpdate.update(task);
        }
        return null;
    }

    public async delete(task: ITaskDelete): Promise<number> {
        // Check if task is owned by user
        if (await this.isOwner(task.taskId, task.userId)) {
            return Task.destroy({
                where: {
                    id: task.taskId,
                }
            });
        }

        throw new Error('Task is not owned by user');
    }

    public async markAsDone(id: number, isDone: boolean = true): Promise<Task | null> {
        const task = await this.findOne(id);
        if (task) {
            const currentDate = new Date();

            if (isDone) {
                return task.update({
                    completedAt: currentDate,
                });
            } else {
                return task.update({
                    completedAt: null,
                });
            }
        }
        return null;
    }

    public async filter(options: IFilter): Promise<Task[]> {
        const where: any = {};
        where.userId = options.ownerId;

        if (options.title) {
            where.title = {
                [Op.iLike]: `%${options.title}%`,
            }
        }
        if (options.isDone) {
            where.completedAt = {
                [Op.ne]: null,
            };
        }

        const order: any = [];
        if (options.sortBy) {
            switch (options.sortBy) {
                case SortBy.TITLE:
                    order.push(['title', 'ASC']);
                    break;
                case SortBy.CREATED_AT:
                    order.push(['createdAt', 'DESC']);
                    break;
                case SortBy.COMPLETED_AT:
                    order.push(['completedAt', 'DESC']);
                    break;
            }
        }

        return Task.findAll({
            where: where,
            order: order,
        });
    }

    public async isOwner(taskId: number, userId: number): Promise<boolean> {
        const task = await this.findOne(taskId);
        if (task) {
            return (await task.getUser()).id === userId;
        }
        return false;
    }

}
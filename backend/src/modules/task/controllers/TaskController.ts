import AbstractController from "@/base/abstract/AbstractController";
import AbstractResponse from "@/base/abstract/AbstractResponse";
import JsonResponse from "@/base/JsonResponse";
import {LoggedInRequest} from "@/middlewares/UserLoggedMiddleware";
import Auth from "@/services/Auth";
import TaskRepository from "@/modules/task/repository/TaskRepository";
import Logger from "@/services/Logger";

export default class TaskController extends AbstractController {

    public async index(req: LoggedInRequest): Promise<AbstractResponse> {
        const user = Auth.getUserTokenInfo(req)
        const userId = user.id

        const taskRepository = new TaskRepository()
        const tasks = await taskRepository.filter({
            ownerId: userId,
        })

        const taskHash = await TaskRepository.tasksHash(userId)

        return new JsonResponse({tasks, hash: taskHash})
    }

    public async create(req: LoggedInRequest): Promise<AbstractResponse> {
        const user = Auth.getUserTokenInfo(req)

        // get params from request
        const title = req.body.title
        const text = req.body.text ?? ''

        if (!title) {
            return new JsonResponse({
                message: 'Missing params'
            }, 400)
        }

        const taskRepository = new TaskRepository()

        const task = await taskRepository.create({
            title,
            text,
            userId: user.id,
        })

        if (task) {
            return new JsonResponse({
                message: 'Task created',
                task,
            })
        }

        return new JsonResponse({
            message: 'Error creating task'
        }, 500)
    }

    public async update(req: LoggedInRequest): Promise<AbstractResponse> {
        const user = Auth.getUserTokenInfo(req)

        // get params from request
        const id = req.body.id

        if (!id) {
            return new JsonResponse({
                message: 'Missing params'
            }, 400)
        }

        const taskRepository = new TaskRepository()

        const isOwner = await taskRepository.isOwner(id, user.id)
        if (!isOwner) {
            return new JsonResponse({
                message: 'Task not found'
            }, 404)
        }

        const title = req.body.title
        const text = req.body.text
        const isDone = req.body.isDone

        let completedAt = undefined
        if (isDone !== undefined) {
            completedAt = isDone ? new Date() : null
            console.log(isDone, completedAt)
        }

        const task = await taskRepository.update(id, {
            title,
            text,
            completedAt,
            userId: user.id,
        })

        if (task) {
            return new JsonResponse({
                message: 'Task updated',
                task,
            })
        }

        return new JsonResponse({
            message: 'Error updating task'
        }, 500)
    }

    public async delete(req: LoggedInRequest): Promise<AbstractResponse> {
        const user = Auth.getUserTokenInfo(req)

        // get params from request
        const id = req.body.id

        if (!id) {
            return new JsonResponse({
                message: 'Missing params'
            }, 400)
        }

        const taskRepository = new TaskRepository()

        const isOwner = await taskRepository.isOwner(id, user.id)
        if (!isOwner) {
            return new JsonResponse({
                message: 'Task not found'
            }, 404)
        }

        try {
            const deleted = await taskRepository.delete({
                taskId: id,
                userId: user.id,
            })

            if (deleted) {
                return new JsonResponse({
                    message: 'Task deleted',
                })
            }

            return new JsonResponse({
                message: 'No task deleted'
            }, 400)

        } catch (e) {
            Logger.instance.error(e)
            return new JsonResponse({
                message: 'Unable to delete task'
            }, 500)
        }
    }

}
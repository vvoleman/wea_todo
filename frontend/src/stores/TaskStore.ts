import {defineStore} from "pinia";
import axios, {AxiosError} from "axios";
import {computed, reactive, ref, Ref} from "vue";
import UnauthorizedError from "@/errors/auth/UnauthorizedError";
import InvalidParams from "@/errors/auth/InvalidParams";
import NotFoundError from "@/errors/NotFoundError";
import {useAuthStore} from "@/stores/AuthStore";

export enum SortBy {
    TITLE = 'title',
    CREATED_AT = 'createdAt',
}

export enum SortDirection {
    ASC = 1,
    DESC = -1,
}

export interface TaskFilter {
    search: string,
    isDone: boolean | null,
    sortBy: SortBy,
    sortDirection: SortDirection,
}

export interface TaskCreate {
    title: string,
    text: string,
}

export interface TaskUpdate extends TaskCreate {
    isDone: boolean|null
    id: number
}

export interface TaskInfo {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    completedAt: string | null;
}

const STORAGE_KEY = 'task'

export const useTaskStore = defineStore('task', () => {
    const tasks: Ref<TaskInfo[]> = ref([])
    const filter: TaskFilter = reactive({
        search: '',
        isDone: null,
        sortBy: SortBy.CREATED_AT,
        sortDirection: SortDirection.ASC,
    })
    const serverHash: Ref<string> = ref('')

    const filteredTasks = computed((): TaskInfo[] => {
        const filtered = tasks.value.filter((task) => {
            // Is completed?
            if (filter.isDone !== null) {
                if (filter.isDone !== (task.completedAt !== null)) {
                    return false
                }
            }

            // title search
            return !(filter.search !== '' && task.title.indexOf(filter.search) === -1);

        });
        const sign = filter.sortDirection as number
        if (filter.sortBy === SortBy.TITLE) {
            return filtered.sort((a, b) => sign * a.title.localeCompare(b.title));
        } else {
            return filtered.sort((a, b) => {
                console.log(sign)
                if (a.createdAt === null) {
                    return sign;
                }

                if (b.createdAt === null) {
                    return -sign;
                }

                return sign * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            })
        }
    })

    const retrieveTasks = async (): Promise<void> => {
        const response = await axios.get('/task')

        if (response.status === 200) {
            tasks.value = response.data.data.tasks;
            serverHash.value = response.data.data.hash;

            // saveToLocalStorage()
            return
        }

        throw new Error('Error retrieving tasks');
    }

    const setFilter = (newFilter: TaskFilter): void => {
        filter.search = newFilter.search
        filter.isDone = newFilter.isDone
        filter.sortBy = newFilter.sortBy
        filter.sortDirection = newFilter.sortDirection
    }

    const create = async (task: TaskCreate): Promise<TaskInfo> => {
        try {
            const response = await axios.post('/task', task)

            if (response.status === 200) {
                const user = response.data.data.task as TaskInfo;
                tasks.value.push(user)

                return user
            }
        } catch (e) {
            const error = e as AxiosError

            if (error.response?.status === 400) {
                throw new InvalidParams("Invalid params")
            }
        }

        throw new Error('Error creating task');

    }

    const update = async (task: TaskUpdate): Promise<TaskInfo> => {
        try {
            const response = await axios.patch('/task', task)

            if (response.status === 200) {
                const user = response.data.data.task as TaskInfo;
                const index = tasks.value.findIndex((t) => t.id === task.id)
                tasks.value[index] = user

                return user
            }
        } catch (e) {
            const error = e as AxiosError

            if (error.response?.status === 400) {
                throw new InvalidParams("Invalid params")
            } else if (error.response?.status === 404) {
                throw new NotFoundError("Task not found")
            }
        }

        throw new Error('Error updating task');
    }

    const remove = async (task: TaskInfo): Promise<void> => {
        try {
            const response = await axios.delete(`/task/`, {
                data: {
                    id: task.id
                }
            })

            if (response.status === 200) {
                const index = tasks.value.findIndex((t) => t.id === task.id)
                tasks.value.splice(index, 1)

                return
            }
        } catch (e) {
            const error = e as AxiosError

            if (error.response?.status === 400) {
                throw new NotFoundError("Unable to delete task")
            } else if (error.response?.status === 404) {
                throw new NotFoundError("Task not found")
            }
        }

        throw new Error('Error deleting task');
    }

    const load = async (): Promise<void> => {
        const user = useAuthStore().user
        serverHash.value = user?.taskHash ?? ''

        // Get task hash from localStorage
        const taskObject = localStorage.getItem(STORAGE_KEY)
        if (!!taskObject) {
            const task = JSON.parse(taskObject)
            if (task.hash === serverHash.value) {
                tasks.value = task.tasks
                return
            }
        }

        await retrieveTasks()
    }

    const saveToLocalStorage = (hash: string): void => {
        serverHash.value = hash
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            hash: serverHash.value,
            tasks: tasks.value
        }))
    }

    retrieveTasks().then()

    return {
        tasks,
        filter,
        retrieveTasks,
        setFilter,
        filteredTasks,
        create,
        update,
        remove
    }
})
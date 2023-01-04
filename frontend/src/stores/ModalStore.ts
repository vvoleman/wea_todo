import {defineStore} from "pinia";
import {TaskInfo} from "@/stores/TaskStore";
import {computed, reactive, ref, Ref} from "vue";

export const useModalStore = defineStore('modal', () => {
    //can be nullable
    const editTask: Ref<TaskInfo | undefined> = ref(undefined)
    const removeTask: Ref<TaskInfo | undefined> = ref(undefined)

    const isEditOpened = computed(() => {
        return editTask.value !== undefined
    })
    const isRemoveOpened = computed(() => {
        return removeTask.value !== undefined
    })

    const showEdit = (task: TaskInfo) => {
        editTask.value = task
    }
    const closeEdit = () => {
        editTask.value = undefined
    }

    const showRemove = (task: TaskInfo) => {
        removeTask.value = task
    }
    const closeRemove = () => {
        removeTask.value = undefined
    }

    return {
        editTask,
        removeTask,
        isEditOpened,
        isRemoveOpened,
        showEdit,
        closeEdit,
        showRemove,
        closeRemove
    }
})
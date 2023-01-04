<template>
    <CustomModal :modelValue="show" @cancel="hide" name="edit-task">
        <template v-slot:title>Upravit úkol #{{task?.id??'?'}}</template>
        <TaskForm @submit="submit" :task="task"/>
    </CustomModal>
</template>

<script lang="ts">
import CustomModal from "@/components/CustomModal.vue";
import TaskForm from "@/components/forms/TaskForm.vue";
import {defineComponent} from "vue";
import {TaskCreate, TaskInfo, TaskUpdate, useTaskStore} from "@/stores/TaskStore";
import {useModalStore} from "@/stores/ModalStore";
import {useToast} from "vue-toastification";

export default defineComponent({
    name: "EditTask",
    components: {
        CustomModal,
        TaskForm
    },
    setup() {
        const taskStore = useTaskStore()
        const modalStore = useModalStore()
        const toast = useToast()

        return {taskStore, modalStore, toast}
    },
    methods: {
        hide() {
            console.log('hide')
            this.modalStore.closeEdit()
        },
        async submit(values: TaskCreate) {
            if (this.task === undefined) return

            try {
                const updateTask: TaskUpdate = {
                    id: this.task.id,
                    title: values.title,
                    text: values.text,
                    isDone: null
                }

                const result = await this.taskStore.update(updateTask)

                this.toast.success(`Úkol (ID:${result.id}) byl úspěšně upraven`)
            } catch (e) {
                this.toast.error('Nepodařilo se upravit úkol (ID: ' + this.task.id + ')');
            }

            this.hide();
        }
    },
    computed: {
        show(): boolean {
            return this.modalStore.isEditOpened
        },
        task(): TaskInfo | undefined {
            return this.modalStore.editTask
        }
    }
})
</script>

<style scoped>

</style>
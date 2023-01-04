<template>
    <CustomModal :modelValue="show" @cancel="hide" name="create-task">
        <template v-slot:title>Smazat úkol</template>
        <p>Opravdu chcete smazat úkol #{{ task?.id ?? '?' }}?</p>
        <div class="btn-bar">
            <button class="" @click="hide">Zrušit</button>
            <button class="btnDelete" @click="submit">Smazat</button>
        </div>
    </CustomModal>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import CustomModal from "@/components/CustomModal.vue";
import {useModalStore} from "@/stores/ModalStore";
import {TaskInfo, useTaskStore} from "@/stores/TaskStore";
import {useToast} from "vue-toastification";

export default defineComponent({
    name: "RemoveTask",
    components: {CustomModal},
    setup() {
        const modalStore = useModalStore();
        const taskStore = useTaskStore();
        const toast = useToast()
        return {
            modalStore,
            taskStore,
            toast
        }
    },
    methods: {
        hide() {
            this.modalStore.closeRemove()
        },
        async submit() {
            if (this.task === undefined) return

            try {
                await this.taskStore.remove(this.task);

                this.toast.success(`Úkol (ID:${this.task.id}) byl úspěšně smazán`)
            } catch (e: any) {
                this.toast.error('Nepodařilo se smazat úkol (ID: ' + this.task.id + ')');
            }

            this.hide();
        }
    },
    computed: {
        task(): TaskInfo | undefined {
            return this.modalStore.removeTask;
        },
        show() {
            return this.modalStore.isRemoveOpened
        }
    }
})
</script>

<style scoped>
.btnDelete {
    background: #fd354c;
}
</style>
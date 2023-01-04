<template>
    <button type="button" @click="show = true">Přidat nový úkol</button>
    <CustomModal :modelValue="show" @cancel="hide" name="create-task">
        <template v-slot:title>Přidat nový úkol</template>
        <TaskForm @submit="submit"/>
    </CustomModal>
</template>

<script setup lang="ts">
import CustomModal from "@/components/CustomModal.vue";
import {ref} from "vue";
import {useToast} from "vue-toastification";
import {TaskCreate, useTaskStore} from "@/stores/TaskStore";
import TaskForm from "@/components/forms/TaskForm.vue";

const show = ref(false);
const toast = useToast();
const store = useTaskStore();

// Define rules


function hide() {
    show.value = false
}

async function submit(task: TaskCreate) {
    try {
        const newTask = await store.create(task);

        hide();
        toast.success('Úkol byl úspěšně vytvořen (ID: ' + newTask.id + ')');
    } catch (e: any) {
        toast.error('Nepodařilo se vytvořit úkol');
    }

    // Process confirm
    hide();
}

</script>

<style scoped>

</style>
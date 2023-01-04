<template>
    <div class="list col-md-6 mx-auto">
        <Task
            v-for="task in store.filteredTasks"
            :key="task.id"

            :task="task"
        />
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useTaskStore} from "@/stores/TaskStore";
import Task from "@/components/tasks/Task.vue";

export default defineComponent({
    name: "TaskList",
    components: {Task},
    setup() {
        const store = useTaskStore()

        return {
            store
        }
    },
})
</script>

<style scoped lang="scss">
.list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }

    // mobile
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
}

.list > * {
    flex: 1 1 33%;
}
</style>
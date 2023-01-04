<template>
    <Filter class="col-12 filter" />
    <TaskList />

    <EditTask />
    <RemoveTask />
</template>

<script setup lang="ts">
import Filter from "@/components/tasks/Filter.vue";
import CreateTask from "@/components/tasks/CreateTask.vue";
import TaskList from "@/components/tasks/TaskList.vue";
import EditTask from "@/components/tasks/EditTask.vue";
import RemoveTask from "@/components/tasks/RemoveTask.vue";

</script>

<style scoped lang="scss">
.f {
    border:1px solid black;
}
.filter {
    margin-top: 10px;
}
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
<template>
    <router-link tag="button" :to="to" v-slot="{ navigate }">
        <button @click="navigate"><slot></slot></button>
    </router-link>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "ButtonLink",
    props: {
        to: {
            type: Object as () => { name: string, params?: Record<string, string> },
            required: true
        },
    }
})
</script>

<style scoped>

</style>
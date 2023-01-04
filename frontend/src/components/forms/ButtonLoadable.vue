<template>
    <button :type="type" class="btn btn-primary" :class="{'button__loader': loading}">
        <span v-if="!loading">{{text}}</span>
        <Loader v-else />
    </button>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
    name: "ButtonLoadable",
    components: {Loader},
    props: {
        loading: Boolean,
        text: String,
        type: {
            type: String,
            default: 'submit'
        }
    },
}
</script>

<style scoped>
button {
    margin-top: 1em;
}
</style>
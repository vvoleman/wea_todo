<template>
    <div v-if="isVisible" class="alert alert-danger">{{text}}</div>
</template>

<script>
export default {
    name: "FormError",
    props: {
        text: String
    },
    computed: {
        isVisible() {
            return this.text !== undefined
        }
    }
}
</script>

<style scoped>

</style>
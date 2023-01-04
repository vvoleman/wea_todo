<template>
    <label :for="id" :class="{'error': hasError}">{{text}}
        <div v-if="hasError" class="error-list">
            <hr>
            {{error}}
        </div>
    </label>
</template>

<script>
export default {
    name: "Label",
    props: {
        text: String,
        id: String,
        error: String,
    },
    computed: {
        hasError() {
            return this.error !== undefined
        }
    }
}
</script>

<style scoped>
label {
    display: block;
    font-size: 1.2em;
    color: #d3d3d3;
    padding: 0.3em 0;
    background: #3c4365;
    transition: 0.2s;
}
label.error {
    background: #ff6464;
    color: #333;
    font-weight: bold;
}
.error-list {
    font-weight: lighter;
}
</style>
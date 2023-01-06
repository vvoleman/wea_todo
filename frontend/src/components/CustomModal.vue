<template>
    <VueFinalModal v-slot="{ params }"
                   v-bind="$attrs"
                   classes="modal-container col-md-8 mx-auto"
                   content-class="modal-content"
                   :click-to-close="true"
    >
        <span class="modal__title">
          <slot name="title"></slot>
        </span>
        <div class="modal__content">
            <slot :params="params"></slot>
        </div>
        <button type="button" class="modal__close" @click="close">
            &times;
        </button>
    </VueFinalModal>
</template>

<script lang="ts">
export default {
    inheritAttrs: true
}
</script>

<script setup lang="ts">
import {$vfm, VueFinalModal} from "vue-final-modal";
import {ref} from "vue";

const emit = defineEmits(['cancel']);

function close() {
    emit('cancel');
}

</script>

<style scoped lang="scss">
::v-deep(.modal-container) {
    display: flex;
    justify-content: center;
    align-items: center;
}

::v-deep(.modal-content) {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 90%;
    margin: 0 1rem;
    padding: 3rem;
    border: 1px solid #333;
    border-radius: 0.25rem;
    background: #444;
}

.modal__title {
    margin: 0 2rem 0 0;
    font-size: 1.5rem;
    font-weight: 700;
}

.modal__content {
    flex-grow: 1;
    overflow-y: auto;
}

.modal__action {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    padding: 1rem 0 0;

    // space between buttons
    & > * + * {
        margin-left: 1rem;
    }

}

.modal__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
}

.dark-mode div ::v-deep(.modal-content) {
    border-color: #2d3748;
    background-color: #1a202c;
}
</style>
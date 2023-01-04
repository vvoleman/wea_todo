<template>
    <Form @submit="submit" v-slot="{errors}" class="col-md-6 mx-auto" :initial-values="initialValues">
        <div class="mb-3">
            <Label id="title" text="Název" :error="errors.title"/>
            <Field name="title" class="form-control" id="title" rules="required"/>
        </div>
        <div class="mb-3">
            <Label id="text" text="Text" :error="errors.text"/>
            <Field name="text" as="textarea"  class="form-control" id="text" />
            <small>Nepovinné</small>
        </div>
        <ButtonLoadable text="Uložit" type="submit"/>
    </Form>
</template>

<script lang="ts">
import {Form, Field, defineRule, SubmissionContext} from "vee-validate";
import ButtonLoadable from "@/components/forms/ButtonLoadable.vue";
import Label from "@/components/forms/Label.vue";
import {defineComponent, PropType} from "vue";
import {required} from "@/forms/validations/base";
import {TaskCreate, TaskInfo} from "@/stores/TaskStore";

defineRule('required', required)

export default defineComponent({
    name: "TaskForm",
    emits: ["submit"],
    props: {
        task: {
            type: Object as PropType<TaskInfo>,
            required: false,
            default: null
        }
    },
    components: {
        Form,
        Field,
        ButtonLoadable,
        Label
    },
    methods: {
        submit(values: any, actions: SubmissionContext) {
            this.$emit('submit', values as TaskCreate)
            actions.resetForm()
        }
    },
    computed: {
        initialValues() {
            return {
                title: this.task?.title,
                text: this.task?.text
            }
        }
    }
})
</script>

<style scoped>

</style>
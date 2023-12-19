<template>
    <Form @submit="onSubmit" v-slot="{ errors }" class="col-xl-6 col-md-8 mx-auto">
        <div class="mb-3">
            <Label text="Email" id="email" :error="errors.email"/>
            <Field class="form-control" id="email" name="email" label="Email" rules="required|email"/>
        </div>
        <div class="mb-3">
            <Label text="Heslo" id="password" :error="errors.password"/>
            <Field type="password" class="form-control" id="password" name="password" label="Heslo"
                   rules="required|min:8"/>
        </div>
        <div class="mb-3">
            <Label text="Heslo znovu" id="password2" :error="errors.password2"/>
            <Field type="password" class="form-control" id="password2" name="password2" label="Heslo"
                   rules="required|confirmed:password"/>
        </div>
        <div>
            <div class="checkbox_group">
                <Field type="checkbox" id="gdpr" name="gdpr" rules="required" :value="true"/>
                <label class="form-check-label" for="gdpr">
                    Souhlasím se zpracováním osobních údajů
                </label>
            </div>
            <FormError text="Toto pole je povinné" v-if="errors.gdpr"/>
        </div>
        <ButtonLoadable type="submit" text="Registrovat se" :loading="submitted"/>
        <div>
            <FormError v-for="error in resultErrors" :key="error" :text="error" />
        </div>
    </Form>
</template>

<script lang="ts">
import {Form, Field, ErrorMessage, defineRule} from "vee-validate";
import FormError from "@/components/forms/FormError.vue";
import Label from "@/components/forms/Label.vue";
import ButtonLoadable from "@/components/forms/ButtonLoadable.vue";
import {defineComponent} from "vue";
import {required, min, confirmed} from "@/forms/validations/base";
import {useAuthStore} from "@/stores/AuthStore";
import UserAlreadyExistsError from "@/errors/auth/UserAlreadyExistsError";
import InvalidParams from "@/errors/auth/InvalidParams";

defineRule('confirmed', confirmed)
defineRule('required', required)
defineRule('min', min)

export default defineComponent({
    name: 'SignUp',
    components: {FormError, Label, ButtonLoadable, Form, Field, ErrorMessage},
    data(){
        return {
            resultErrors: [] as string[],
            submitted: false,
        }
    },
    setup() {
        const store = useAuthStore();
        return {
            store,
        }
    },
    methods: {
        async onSubmit(values: any) {
            const {email, password, password2, gdpr} = values

            this.resultErrors = []
            this.submitted = true

            try {
                await this.store.signUp(email, password, password2)

                await this.$router.push({name: 'home'})
            } catch (e) {
                if (e instanceof UserAlreadyExistsError) {
                    this.resultErrors.push('Uživatel s tímto emailem již existuje')
                } else if (e instanceof InvalidParams) {
                    this.resultErrors.push('Neplatné parametry')
                } else {
                    this.resultErrors.push('Vyskytla se neočekávaná chyba')
                }
            }

            this.submitted = false
        }
    }
})

</script>

<style scoped>

</style>

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
        <div class="checkbox_group">
            <Field type="checkbox" id="remember_me" name="remember_me" :value="true"/>
            <label class="form-check-label" for="remember_me">
                Zapamatovat si mě
            </label>
        </div>
        <ButtonLoadable type="submit" text="Přihlásit se" :loading="submitted"/>
        <div>
            <FormError v-for="error in resultErrors" :key="error" :text="error" />
        </div>
    </Form>
</template>

<script lang="ts">
import {Form, Field, ErrorMessage, defineRule} from "vee-validate";
import FormError from "@/components/forms/FormError.vue";
import Label from "@/components/forms/Label.vue";
import {email, required, min as minRule} from "@/forms/validations/base";
import ButtonLoadable from "@/components/forms/ButtonLoadable.vue";
import {useAuthStore} from "@/stores/AuthStore";
import UnauthorizedError from "@/errors/auth/UnauthorizedError";
import {defineComponent} from "vue";

defineRule('email', email)
defineRule('required', required)
defineRule('min', minRule)

export default defineComponent({
    name: "SignIn",
    components: {ButtonLoadable, Label, FormError, Form, Field, ErrorMessage},
    data() {
        return {
            email: '',
            password: '',
            rememberMe: false,
            submitted: false,
            resultErrors: [] as string[]
        }
    },
    setup() {
        const store = useAuthStore();
        return {
            store,
        }
    },
    methods: {
        async onSubmit (values: any){
            const {email, password, rememberMe} = values

            this.resultErrors = []
            this.submitted = true

            try {
                const authStore = await this.store
                await authStore.signIn(email, password)
            } catch (e) {
                console.log(e)
                let errorMsg;
                if (e instanceof UnauthorizedError) {
                    errorMsg = "Neplatné přihlašovací údaje"
                } else {
                    errorMsg = "Vyskytla se neočekávaná chyba"
                }

                this.resultErrors.push(errorMsg)

            }

            this.submitted = false

            // Redirect to home
            this.$router.push({name: 'home'})
        },
    }
})
</script>

<style scoped lang="scss">


</style>
<template>
    <button @click="logout">
        <InfoTag icon="user" :tag="email" theme="lighter"/>
        Odhlásit se
    </button>
</template>

<script lang="ts">
import InfoTag from "./tasks/InfoTag.vue";
import {defineComponent} from "vue";
import {useAuthStore} from "@/stores/AuthStore";

export default defineComponent({
    name: "UserTag",
    components: {InfoTag},
    setup() {
        const store = useAuthStore()

        return {
            store
        }
    },
    methods: {
        async logout() {
            await this.store.signOut()
            this.$router.push({name: 'signin'})
        }
    },
    computed: {
        email() {
            const user = this.store.user

            if (user) {
                return user.email
            }

            return '...'
        },
    }
})
</script>

<style scoped lang="scss">
.tag button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
</style>
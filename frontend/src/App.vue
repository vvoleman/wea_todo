<template>
    <LoginStatus />
    <nav>
        <div v-if="!store.isAuthenticated" class="actions actions__centered">
            <ButtonLink :to="{name: 'signin'}">Přihlásit se</ButtonLink>
            <ButtonLink :to="{name: 'signup'}">Registrace</ButtonLink>
        </div>

        <UserTag v-else/>
    </nav>

    <div>
        <router-view />
    </div>
</template>

<script lang="ts">
import LoginStatus from "@/components/LoginStatus.vue";
import {useAuthStore} from "@/stores/AuthStore";
import {defineComponent} from "vue";
import ButtonLink from "@/components/ButtonLink.vue";
import UserTag from "@/components/UserTag.vue";
export default defineComponent({
    name: 'App',
    components: {UserTag, ButtonLink, LoginStatus},
    setup() {
        const store = useAuthStore()

        return {
            store
        }
    }
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

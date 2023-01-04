<template>
    <div class="statusBlock">
        <div class="status">
            <div class="circle" :class="statusColor"></div>
            <b v-if="statusColor === ''">Přihlášen</b>
            <b v-if="statusColor === 'red'">Nepřihlášen</b>
            <b v-if="statusColor === 'orange'">Načítám</b>
        </div>

    </div>
</template>

<script lang="ts">
import {useAuthStore} from "@/stores/AuthStore";
import {defineComponent} from "vue";
import InfoTag from "@/components/tasks/InfoTag.vue";

export default defineComponent({
    name: "LoginStatus",
    components: {InfoTag},
    setup() {
        const store = useAuthStore();
        return {
            store
        }
    },
    computed: {
        statusColor(){
            if (this.store.user === undefined) {
                return 'orange'
            }


            return !this.store.isAuthenticated ? 'red' : ''
        }
    }
})
</script>

<style scoped>
.statusBlock {
    margin-bottom: 10px;
}
.circle {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: #42b883;
    display: inline-block;
    margin-right: 0.5em;
}
.red {
    background: #ff6464;
}
.orange {
    background: #ff9e64;
}
.tag {
    margin-top:5px;
}
</style>
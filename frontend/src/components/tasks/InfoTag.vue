<template>
    <div class="tag" :class="theme">
        <font-awesome-icon :icon="icon" />
        <span>{{tag}}</span>
    </div>
</template>

<script lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {defineComponent} from "vue";
export default defineComponent({
    name: "InfoTag",
    components: {
        FontAwesomeIcon
    },
    props: {
        tag: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        theme: {
            type: String as () => 'darker' | 'lighter',
            default: ()=>'darker'
        }
    }
})
</script>

<style scoped>
.tag {
    border-radius: 5px;
    padding: 5px 12px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
.darker {
    background-color: #222;
}
.lighter {
    background-color: #3a3a3a;
}
</style>
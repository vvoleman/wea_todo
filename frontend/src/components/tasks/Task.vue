<template>
    <div class="task" :class="taskClass">
        <div class="bar">
            <InfoTag :tag="date" icon="fa-calendar"/>
            <div class="actions">
                <button @click="displayText = !displayText" v-if="isLong" class="btn-round" :title="displayText ? 'Skrýt' : 'Zobrazit' + ' celý text'">
                    <font-awesome-icon :icon="displayText ? 'caret-up' : 'caret-down'"/>
                </button>
                <button @click="edit" class="btn-round btnEdit">
                    <font-awesome-icon icon="fa-pen"/>
                </button>
                <button @click="remove" class="btn-round btnDelete">
                    <font-awesome-icon icon="fa-trash"/>
                </button>
                <button
                    @click="toggleDone"
                    class="btn-round"
                    :title="isDone ? 'Označit jako nedokončené' : 'Označit jako dokončené'"
                    :class="!isDone ? 'markDone' : 'markUndone'">
                    <font-awesome-icon :icon="isDone ? 'fa-close' : 'fa-check'"/>
                </button>
            </div>
        </div>

        <div class="title">
            <h3>{{ task.title }}</h3>
        </div>
        <div class="body">
            <p>{{ shortenText }}</p>
        </div>

        <div class="tags">

        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {TaskInfo, TaskUpdate, useTaskStore} from "@/stores/TaskStore";
import {useToast} from "vue-toastification";
import {useModalStore} from "@/stores/ModalStore";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import InfoTag from "@/components/tasks/InfoTag.vue";

export default defineComponent({
    name: "Task",
    components: {
        InfoTag,
        FontAwesomeIcon
    },
    props: {
        task: {
            type: Object as () => TaskInfo,
            required: true
        }
    },
    data() {
        return {
            displayText: false,
            textLimit: 100
        }
    },
    setup() {
        const store = useTaskStore()
        const toast = useToast()
        const modalStore = useModalStore()
        return {store, toast, modalStore}
    },
    methods: {
        edit() {
            this.modalStore.showEdit(this.task)
        },
        remove() {
            this.modalStore.showRemove(this.task)
        },
        async toggleDone() {
            const isDone = !this.task.completedAt
            const newTaskInfo = {
                id: this.task.id,
                title: this.task.title,
                text: this.task.text,
                isDone: isDone
            } as TaskUpdate

            try {
                await this.store.update(newTaskInfo)
                this.toast.success(`Úkol (ID:${this.task.id}) byl označen jako ${!isDone ? 'ne' : ''}dokončený`)
            } catch (e) {
                this.toast.error(`Nepodařilo se změnit úkol (ID: ${this.task.id})`)
            }
        }
    },
    computed: {
        isDone() {
            return this.task.completedAt !== null
        },
        taskClass() {
            return ''
            return this.isDone ? 'done' : 'undone'
        },
        shortenText() {
            if (this.displayText) return this.task.text
            return this.task.text.length > 100 ? this.task.text.substring(0, 100) + '...' : this.task.text
        },
        isLong() {
            return this.task.text.length > this.textLimit
        },
        date() {
            const createdAt = new Date(this.task.createdAt)

            return createdAt.toLocaleDateString('cs-CZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }
    }
})
</script>

<style scoped lang="scss">
.task {
    min-height: 200px;
    border: 1px solid #696969;
    padding: 10px;
    border-radius: 5px;
    background: #393939;
    transition: .1s;

    &:hover {
        background: #494949;
    }

    &.done {
        background: #5ca0ff;
    }

    &.undone {
        // wine
        background: #811717;
    }

    & .bar {
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
}

.markDone {
    background: #42b883;
}

.markUndone {
    background: #ff7600;
}

.btnDelete {
    background: #fd354c;
}

.btnEdit {
    background: #602efd;
}

.tags {
    width: 100%;
    display: inline-flex;
    gap: 5px;
    justify-content: start;
}
</style>
<template>
    <form class="row row-cols-lg-auto g-3 align-items-center filter">
        <div class="col-12 item">
            <label class="visually-hidden" for="searchInput">Název úkolu</label>
            <div class="input-group">
                <div class="input-group-text">
                    <font-awesome-icon icon="magnifying-glass"/>
                </div>
                <input type="text" class="form-control" id="searchInput" placeholder="Název úkolu" v-model="search">
            </div>
        </div>

        <div class="col-12 item">
            <label class="visually-hidden" for="doneSelect">Preference</label>
            <div class="input-group">
                <div class="input-group-text">
                    Zobrazit úkoly
                </div>
                <select class="form-select" id="doneSelect" v-model="done">
                    <option :value="null" selected>Všechny</option>
                    <option :value="true">Jen hotové</option>
                    <option :value="false">Jen nehotové</option>
                </select>
            </div>
        </div>

        <div class="col-12 item">
            <label class="visually-hidden" for="sortSelect">Preference</label>
            <div class="input-group">
                <button type="button" class="input-group-text" @click="sortDir*=-1" :title="'Seřadit ' + (sortDir === 1? 'sestupně' : 'vzestupně')">
                    <font-awesome-icon :icon="sortIcon"/>
                </button>
                <select class="form-select" id="sortSelect" v-model="sortBy">
                    <option value="title" selected>Název</option>
                    <option value="createdAt">Datum</option>
                </select>
            </div>
        </div>
        <CreateTask />
    </form>
</template>

<script lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {defineComponent} from "vue";
import {SortBy, SortDirection, TaskFilter, useTaskStore} from "@/stores/TaskStore";
import CreateTask from "@/components/tasks/CreateTask.vue";

export default defineComponent({
    name: "Filter",
    components: {CreateTask, FontAwesomeIcon},
    data() {
        return {
            search: '',
            sortBy: 'title' as SortBy,
            sortDir: 1 as SortDirection,
            done: null as boolean | null,
        }
    },
    setup() {
        const store = useTaskStore();
        return {
            store,
        }
    },
    methods: {
        updateFilter() {
            console.log(this.sortDir)
            const filter: TaskFilter = {
                search: this.search,
                sortBy: this.sortBy,
                isDone: this.done,
                sortDirection: this.sortDir,
            }

            this.store.setFilter(filter)
        }
    },
    computed: {
        sortIcon() {
            return this.sortDir === -1 ? 'sort-asc' : 'sort-desc'
        }
    },
    watch: {
        search: {
            handler: 'updateFilter',
            immediate: true,
        },
        sortBy: {
            handler: 'updateFilter',
            immediate: true,
        },
        done: {
            handler: 'updateFilter',
            immediate: true,
        },
        sortDir: {
            handler: 'updateFilter',
            immediate: true,
        },
    }
})
</script>

<style scoped lang="scss">
.filter {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: .2rem;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }

}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input-group {

}

.input-group-text {
    background: #222;
    color: white;
    border: 1px solid #494949;
}
</style>
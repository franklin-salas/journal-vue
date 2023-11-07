<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2 pb-1">
            <input type="text"
                class="form-control"
                placeholder="Buscar entrada"
                v-model="term">

        </div>
        <div class="my-2 d-flex flex-column">
            <button class="btn btn-primary mx-2"
                @click="$router.push({name:'entry-view', params:{id:'new'}})">
                <i class="fa fa-plus-circle"></i>
                Nuevo
            </button>
        </div>
        <div class="entry-scrollarea">
            <entry-component v-for="entry in entriesByTerm"
            :key="entry.id"
             :entry= "entry"/>
        </div>
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex';

export default {
    components: {
        EntryComponent: defineAsyncComponent(() => import('./EntryComponent.vue')),
        
    },
    data(){
        return {
            term: ''
        }
    },
    computed :{
        ...mapGetters('journal',['getEntriesByTerm']),

        entriesByTerm() {
            return this.getEntriesByTerm(this.term)
        }
    }
}
</script>
<style lang="scss" scoped>
    .entry-list-container{
        border-right: 1px solid #2c3e50;
        height: calc(100vh - 56px);
    }
    .entry-scrollarea{
        height: calc(100vh - 120px);
        overflow: scroll;
    }
</style>
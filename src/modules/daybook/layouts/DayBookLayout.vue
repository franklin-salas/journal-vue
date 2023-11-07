<template>
    <navbar-component/>

    <div v-if="isLoading" class="row justify-content-md-center">
        <div class="col-3 bg-info text-center mt-5">
            Cargando ...
            <h3 class="mt-2">
                <i class="fa fa-spin fa-sync"></i>
            </h3>

        </div>
    </div>



    <div  v-else class="d-flex">
        <div class="col-4">
            <entry-list-Component/>
        </div>
        <div class="col">
            <router-view>

            </router-view>
        </div>
    </div>

 
</template>

<script>
import { defineAsyncComponent } from 'vue'
import {mapActions, mapState} from 'vuex'

export default {
    
    components: {
        NavbarComponent:  defineAsyncComponent(() => import('../components/NavbarComponent.vue')),
        EntryListComponent:  defineAsyncComponent(() => import('../components/EntryListComponent.vue')),
    },

    methods: {
        ...mapActions('journal',['loadEntries'])
    },
    computed: {
        ...mapState('journal',['isLoading'])
    },

    created(){
        this.loadEntries()
    }
    
    
}
</script>

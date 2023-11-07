<template>

    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{ day }}</span>
            <span class="mx-1 fs-3">{{ month }}</span>
            <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
        </div>

        <div>
            <input type="file"
            @change="onSelectedImage"
            ref="imageSelector"
            v-show="false"
            accept="image/png,image/jpeg"
            >
            <button class="btn btn-danger mx-2"
             v-if="entry.id"
             @click="onDeleteEntry">
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>
        
            <button class="btn btn-primary" @click="onSelectImage">
                Subir foto 
                <i class="fa fa-upload"></i>
            </button>
        </div>
    </div>
    <hr>
    <div class="d-flex flex-column px-3 h-75">
        <textarea placeholder="¿Que sucedio hoy?" v-model="entry.text"></textarea>
    </div>
    <img v-if="entry.picture && !localImage" 
    :src="entry.picture"
     alt="entry-picture"
     class="img-thumbnail">
            
     <img v-if="localImage"
     :src="localImage"
     alt="entry-picture"
     class="img-thumbnail">
    </template>
    <fab-component icon="fa-save"
    @on-click="saveEntry"
    />
   

</template>

<script>
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

import {mapGetters,mapActions} from 'vuex'
import { defineAsyncComponent } from 'vue'
import uploadImage from '@/helpers/uploadImage'

import Swal from 'sweetalert2'
export default {
    components: {
        FabComponent : defineAsyncComponent(()=> import('../components/FabComponent.vue'))

    },
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },
    computed: {
        ...mapGetters('journal',['getEntryById']),
        day(){
        const date = new Date(this.entry.date)
        return date.getDate()
    },
    month(){
        const date = new Date(this.entry.date)
        return months[date.getMonth()]
    },
    yearDay(){
        const date = new Date(this.entry.date)
        return `${date.getFullYear() }, ${days[date.getDay()]}`
    },
    },
    methods: {
        ...mapActions('journal',['updateEntry','createEntry','deleteEntry']),
        loadEntry(){

            let entry ;
            if(this.id === 'new'){
                entry = {
                    date: new Date().getTime(),
                    text: ''
                }       
            }else {
            entry = this.getEntryById(this.id)
             if(!entry) {
                 return this.$router.push({name:'no-entry'})
             }     
        }  

            this.entry = entry

        },
        async saveEntry(){
            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false
            })

            Swal.showLoading()

            if(this.file){
                const picture = await uploadImage(this.file)
            this.entry.picture = picture
            }
        

            if(this.entry.id){
                await this.updateEntry(this.entry)
            }else {
               
                  const id = await this.createEntry(this.entry)
                  this.$router.push({name:'entry-view', params:{id}})
            }
            this.file = null 
            this.localImage = null
            Swal.fire('Guardado','Entrada registrada con éxito', 'success')
            
        },
        async onDeleteEntry(){

            const { isConfirmed} = await Swal.fire({
                title:'¿Esta seguro?',
                text:'Una vez borrado, no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })

            if( isConfirmed){

                new Swal({
                    title:'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()
                await this.deleteEntry(this.entry.id)
                this.$router.push({name:'no-entry'})

                Swal.fire('Eliminado','','success')

            }
            

        },
        onSelectedImage(event){

            const file = event.target.files[0]
            if(!file){
                this.localImage = null
                this.file = null
                return
            }
            this.file = file
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL(file)

        },

        onSelectImage(){
            this.$refs.imageSelector.click()
        }




    },
    /// hook
    created(){
        this.loadEntry()
    },
    watch: {
        id(){
            this.loadEntry()
        }
    }

}
</script>
<style lang="scss" scoped>
textarea{
    font-size: 20px;
    border: none;
    height: 100%;
    &:focus{
        outline: none;
    }
} 

img{
        width: 200px;
        position: fixed;
        bottom: 130px;
        right: 60px;
        box-shadow: 0px 5px 10px rgba($color:#000000 , $alpha:0.2);
    }

</style>
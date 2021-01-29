<template>

 <form action="" @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" v-model="title" required placeholder="Playlist title">
    <textarea type="text" v-model="description" required placeholder="playlist description"></textarea>
    <label for="">Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    
    <div class="error">{{ fileError }}</div>
    
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Loading</button>
 </form>

</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'

export default {

    setup(){
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const{ url, filePath, uploadImage} = useStorage()
        const{ addDoc, error } = useCollection('Playlists')
        const{ user } = getUser()
        const isPending = ref(false)

        const handleSubmit = async() => {

            if(file.value){
                //image uploading in firestore

               isPending.value = true 
               await uploadImage(file.value)

               //submitting the form in firestore
               await addDoc({

                   title: title.value,
                   description: description.value,
                   userId: user.value.uid,
                   userName: user.value.displayName,
                   coverUrl: url.value,
                   filePath: filePath.value,
                   songs: [],
                   createdAt: timestamp(),  
               })

               isPending.value =false 
               if(!error.value){
                   console.log('playlist added');
                   isPending.value = false
               }
               
            }
            
        
        }
        //allowed file types 
        const types = ['image/jpeg', 'image/png']
        const fileError = ref(null)
        
        const handleChange = (e) => {
            const selected = e.target.files[0]
            if(selected && types.includes(selected.type)){
                file.value = selected
                fileError.value = null
            }else{
                file.value = null
                fileError.value = "Please select an image(png or jpeg)"
            }
            
            console.log(file.value);
        }



        return{ title, description, handleSubmit, handleChange, fileError, isPending}
    }


}
</script>

<style>
    label{
        font-size:12px;
        display: block;
        margin-top:30px

        
    }
    input[type= "file"]{
        border: 0;
        padding:0;        

    }
    button {

        margin-top: 20px
    }

</style>
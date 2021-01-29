<template>

 <form action="" @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" v-model="title" required placeholder="Playlist title">
    <textarea type="text" v-model="description" required placeholder="playlist description"></textarea>
    <label for="">Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    
    <div class="error">{{ fileError }}</div>
    
    <button>Create</button>
 </form>

</template>

<script>
import { ref } from 'vue'
export default {

    setup(){
        const title = ref('')
        const description = ref('')
        const file = ref(null)

        const handleSubmit = () => {

            if(file.value){

                console.log(title.value, description.value, file.value);
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



        return{ title, description, handleSubmit, handleChange, fileError}
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
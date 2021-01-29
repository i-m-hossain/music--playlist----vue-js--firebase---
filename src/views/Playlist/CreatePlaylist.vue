<template>

 <form action="" @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" v-model="title" required placeholder="Playlist title">
    <textarea type="text" v-model="description" required placeholder="playlist description"></textarea>
    <label for="">Upload playlist cover image</label>
    <input type="file" >
    <div class="error">{{ error }}</div>
    <button>Create</button>
 </form>

</template>

<script>
import { ref } from 'vue'
export default {

    setup(){
        const title = ref('')
        const description = ref('')

        const handleSubmit = () => {
            console.log(title.value, description.value);
        
        }



        return{ title, description, handleSubmit}
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
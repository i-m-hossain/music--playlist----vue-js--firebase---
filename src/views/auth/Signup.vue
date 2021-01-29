<template>
  <form action="" @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" v-model="displayName" placeholder="Enter display name">
    <input type="email" v-model="email" placeholder="Enter email" >
    <input type="password" v-model="password" placeholder="Enter password">
   
    <div v-if="error" class="error"> {{ error }}</div>

    <button v-if="!isPending">Sign Up</button>
    <button v-else disabled>Loading</button>
  
  </form>
</template>

<script>

import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
export default {

    

    setup(){

        const {error, signup, isPending} = useSignup()

        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        
        const handleSubmit= async() => {

            const res = await signup(email.value, password.value, displayName.value)
            if(!error.value){
                console.log('user signed up')
            }

        }

        return { error, isPending, email, password, displayName, handleSubmit}
    }


}
</script>

<style>

</style>
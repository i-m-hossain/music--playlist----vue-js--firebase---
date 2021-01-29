<template>

  
  <form action="" @submit.prevent="handleSubmit">
  <h3>Login</h3>
  
  <input type="email" v-model="email" placeholder="enter email">  
  <input type="password" v-model="password" placeholder="enter password">


  <div class="error" v-if="error">
    {{ error }}
  </div>

  <button v-if="isPending" disabled>loading</button>
  <button v-else>Login</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'

export default {
    
    setup(){

        const { error, login, isPending } = useLogin()
        const email = ref('')
        const password = ref('')

        const handleSubmit= async() => {
            
            const res= await login(email.value, password.value)
            if(!error.value){
                console.log('user is logged in');
            }

        }


        return { email, password, handleSubmit,error, isPending }
        
    }

}
</script>

<style>

</style>
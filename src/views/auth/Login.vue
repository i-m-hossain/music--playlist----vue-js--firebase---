<template>

  
  <form action="" @submit.prevent="handleSubmit">
  <h3>Login</h3>
  
  <input type="email" v-model="email" placeholder="enter email">  
  <input type="password" v-model="password" placeholder="enter password">


  <div class="error" v-if="error">
    {{ error }}
  </div>

  <button v-if="isPending" disabled>loading</button>
  <button v-if="!isPending">Login</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { useRouter } from "vue-router"
import { ref } from 'vue'

export default {
    
    setup(){

        const { error, login, isPending } = useLogin()
        const email = ref('')
        const password = ref('')
        const router = useRouter()

        const handleSubmit= async() => {
            
            const res= await login(email.value, password.value)
            if(!error.value){
          
                router.push({name: "UserPlaylists"})
                console.log('logged in');

            }

        }


        return { email, password, handleSubmit,error, isPending }
        
    }

}
</script>

<style>

</style>
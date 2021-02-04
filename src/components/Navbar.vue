<template>
  <div class="navbar">
      <nav>

        <img src="@/assets/music-playlist-folder.png" alt="">
        <h1><router-link :to="{ name: 'Home' }">Music Playlist</router-link></h1>
        <div class="links">



            
            <div v-if="user">
                
                <router-link :to="{name: 'UserPlaylists'}">My playlist</router-link>
                <router-link :to="{name: 'CreatePlaylist'}"> Create Playlist</router-link>

                <span>Hi there,  {{ user.displayName }}</span>

                <button  @click="handleClick">Logout</button>
            </div>
            
            <div v-else>
                <router-link class="btn" :to="{name: 'Login'}">Login</router-link>
                <router-link class="btn" :to="{name: 'Signup'}">Signup</router-link>
            </div>
        </div>
      </nav>
  </div>

</template>

<script>

//Loging out a user
//  -fire a function called handleClick when the logout button is clicked
//  -inside the function log the user out & then redirect to the login view


//conditionally showing links
//  -only show the log out button if a user is logged in
//  -only show the sign up and login button if a user is not logged in
//  -use the getUser composable to help

import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router' 
export default {

    setup(){

        const{ error, logout, isPending } = useLogout()
        const{ user } = getUser()
        const router = useRouter()

        const handleClick = async() => {
           await logout()
           console.log('logged out');
           router.push({name: 'Login'})

        }

        return { handleClick, error, isPending, user }
    }

} 

</script>

<style scoped>

    nav{
        display: flex;
        align-items: center;
        margin: 0 auto;
        max-width: 1200px;

    }
    .navbar{
        padding:16px 10px;
        margin-bottom: 16px;
        background:#fff;

    }
    nav h1{
        margin-left: 20px;
    }
    nav .links{
        margin-left: auto;
    }

    nav .links a, button{
        margin-left: 16px;
        font-size:14px;

    }

    nav img{
        max-height: 30px;
    }
    span{
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        margin: 0 10px;
        padding: 0 10px;
    
    }


</style>
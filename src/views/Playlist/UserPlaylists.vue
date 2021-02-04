<template>
  <h2>My playlist</h2>

  <div v-if="playlists">
    <ListView :playlists= "playlists"/> 
  </div>

  <router-link :to="{name: 'CreatePlaylist'}" class="btn">Create a new Playlist</router-link>


  
</template>

<script>
import ListView from '@/components/ListView'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'

export default {

    components:{ListView},
    setup(){

        const { user } = getUser()

        //second parameter of get collection will be the user id to be queried
        const { documents: playlists } = getCollection('Playlists', ['userId', '==', user.value.uid ]);

        console.log(playlists);

        



        return { user, playlists }
    }

    

}
</script>



<style scoped>

  
</style>
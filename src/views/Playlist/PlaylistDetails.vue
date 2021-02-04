<template>

  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">

    <!-- playlist information --> 
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete"> Delete Playlist</button>
    
    </div>
    
    <!-- song list -->
    <div class="song-list">
      <h2 v-if="!playlist.songs.length">  No songs have been added to the playlist  </h2>
      <h2 v-else>Song List</h2>

      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>      
        </div>
        <button v-if="ownership" @click="handleClick(song.id)" >Delete</button> 
      </div>

      <!------ Add song  component --->
      <AddSong v-if="ownership" :playlist="playlist"/>
      
    </div>
    
  </div>
</template>

<script>
//Deleting A song
//  --- Attach a click Handler to the delete button
//  --- inside the fuction use the updateDoc function to delete that song 
//  --- we will need to pass the song id into the handleClick fuction
//  --- Hint: use the filter method 

import AddSong from '@/components/AddSong'
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  props: ['id'],
  components:{AddSong},
  setup(props) {
    const { error, document: playlist } = getDocument('Playlists', props.id)
    const { user } = getUser()
    const { deleteDoc, updateDoc } = useDocument('Playlists', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()
    const ownership = computed(() => {
        //three conditions must be checked 1.if the playlist is already loaded 2. if any user is loggedin
        //3. if user id matches with playlist user id
        // then this computed property will return true  

        return playlist.value && user.value && playlist.value.userId == user.value.uid 
    })

    const handleDelete = async () => {
        await deleteDoc()
        await deleteImage(playlist.value.filePath)
        
        router.push({name: 'Home'})

    }

    const handleClick = async(id) => {
      const songs = playlist.value.songs.filter( (song) => song.id != id)
      await updateDoc({songs: songs})
    }
    
    return { error, playlist, ownership, handleDelete, handleClick}
  }
}
</script>

<style scoped>
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }

  .playlist-info {
    text-align: center;
  }

  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  button{
      margin-bottom: 30px;
  }
  .single-song{
    
    border-bottom:1px dashed var(--secondary);
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  }

  .details{
  

  }

  

 


</style>
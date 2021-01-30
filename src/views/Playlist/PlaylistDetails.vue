<template>
  <div class="single">
            <div class="thumbnail">
                <img :src="id.coverUrl">
            </div>
            <div class="info">
                <h3>{{ id.title }}</h3>    
                <p>created by {{ id.userName }}</p>
            </div>
            <div class="song-number">
                <p>{{ id.songs.length }} songs</p>
            </div>
        </div>
</template>

<script>
import useCollection from '@/composables/useCollection'
export default {

    props: ['id']

} 
</script>

<style>

</style>
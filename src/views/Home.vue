<template>
  <div class="home">
    <p>Homepage</p>
    <div v-if="documents"> 
      <div v-for="doc in documents" :key="doc.id">
        <h2>{{ doc.title }}</h2> 
      </div>
    </div>
    <div class="error" v-if="error">Could not fetch the data</div>
  </div>
</template>

<script>
// getting data from firebase using get collection

//  -get realtime data from the playlists collection
//  -output 2 conditional items -error, or playlist titles
import getCollection from '@/composables/getCollection'

export default {
  name: 'Home',
  components: {
  
  },
  setup() {
    
    const{ error, documents} = getCollection('Playlists') 
    

    return {error, documents}
  }
}
</script>

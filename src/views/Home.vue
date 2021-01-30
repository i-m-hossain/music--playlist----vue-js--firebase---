<template>
  <div class="home">
    <p>Homepage</p>
    <div v-if="documents"> 
      <ListView :playlists = "documents"/>
    </div>
    <div class="error" v-if="error">Could not fetch the data</div>
  </div>
</template>

<script>
// getting data from firebase using get collection

//  -get realtime data from the playlists collection
//  -output 2 conditional items -error, or playlist titles
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView'

export default {
  name: 'Home',
  components: { ListView},
  setup() {
    
    const{ error, documents} = getCollection('Playlists') 
    

    return {error, documents}
  }
}
</script>

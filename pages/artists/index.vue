<template>
    <div>
      <h2>Artistas</h2>
      <div class="artist-list">
        <ArtistComponent v-for="artist in artists" :key="artist._id" :artist="artist" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import ArtistComponent from '~/components/ArtistComponent.vue'
  
  const artists = ref([])
  
  onMounted(async () => {
    const response = await axios.get('http://cms-una.unaux.com/:bookstore/api/content/items/artists')
    artists.value = response.data
  })
  </script>
  
  <style scoped>
  .artist-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  </style>
  
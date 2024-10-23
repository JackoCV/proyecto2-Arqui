<template>
    <div v-if="artist" class="artist-detail">
      <h2>{{ artist.name }}</h2>
      <img :src="artist.image" alt="Imagen del Artista" />
      <p>{{ artist.bio }}</p>
    </div>
    <div v-else>
      Cargando...
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const artist = ref(null)
  const route = useRoute()
  
  onMounted(async () => {
    const response = await axios.get(`http://cms-una.unaux.com/:bookstore/api/content/item/artists/${route.params.id}`)
    artist.value = response.data
  })
  </script>
  
  <style scoped>
  .artist-detail {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  .artist-detail img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  </style>
  
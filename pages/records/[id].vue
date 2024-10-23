<template>
    <div v-if="record" class="record-detail">
      <h2>{{ record.name }}</h2>
      <img :src="record.image" alt="Imagen de la disquera" class="record-image" />
      <p><strong>Ubicación:</strong> {{ record.location }}</p>
      <p><strong>Año de fundación:</strong> {{ record.founded }}</p>
  
      <h3>Artistas:</h3>
      <ul>
        <li v-for="artist in record.artists" :key="artist._id">
          <NuxtLink :to="`/artists/${artist._id}`">{{ artist.name }}</NuxtLink>
        </li>
      </ul>
  
      <h3>Álbumes:</h3>
      <ul>
        <li v-for="album in record.albums" :key="album._id">
          <NuxtLink :to="`/albums/${album._id}`">{{ album.title }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div v-else>
      Cargando...
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const record = ref(null)
  const route = useRoute()
  
  onMounted(async () => {
    const response = await axios.get(`http://cms-una.unaux.com/:bookstore/api/content/item/records/${route.params.id}`)
    record.value = response.data
  })
  </script>
  
  <style scoped>
  .record-detail {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .record-image {
    max-width: 300px;
    height: auto;
    margin-bottom: 20px;
  }
  </style>
  
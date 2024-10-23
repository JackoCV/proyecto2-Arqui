<template>
  <div v-if="album" class="album-detail">
    <h2>{{ album.title }}</h2>
    <img :src="`http://cms-una.unaux.com/jazz-music/storage/uploads${album.image.path}`" alt="Imagen del Álbum" class="album-image" />
    <p><strong>Artista:</strong> {{ album.artist }}</p>
    <p><strong>Año de lanzamiento:</strong> {{ album.release_year }}</p>
    <h3>Canciones:</h3>
    <ul>
      <li v-for="song in album.songs" :key="song">{{ song }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const album = ref(null)
const route = useRoute()

onMounted(async () => {
  try {
    const response = await axios.get(`http://cms-una.unaux.com/jazz-music/api/content/item/albums/${route.params.id}`)
    album.value = response.data
  } catch (error) {
    console.error('Error al obtener los detalles del álbum:', error)
  }
})
</script>

<style scoped>
.album-detail {
  text-align: center;
}
.album-image {
  max-width: 300px;
}
</style>

<template>
  <div>
    <h2>Álbumes</h2>
    <div class="album-list">
      <AlbumComponent v-for="album in albums" :key="album._id" :album="album" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AlbumComponent from '~/components/AlbumComponent.vue'

const albums = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://cms-una.unaux.com/jazz-music/api/content/items/albums')
    albums.value = response.data
  } catch (error) {
    console.error('Error al obtener la lista de álbumes:', error)
  }
})
</script>

<style scoped>
.album-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>

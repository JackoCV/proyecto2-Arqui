<template>
  <div class="artist-card">
    <img :src="artist.image || 'default-image-url.jpg'" alt="Artist Photo" class="artist-image" />
    <h3>{{ artist.name || 'Unknown Artist' }}</h3>
    <p>Género: {{ artist.genre || 'Unknown Genre' }}</p>
    <router-link :to="{ name: 'ArtistDetail', params: { id: artist.id } }" class="view-details-button">
      Ver Detalles
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    artist: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.artist-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  margin-bottom: 20px;
  max-width: 300px;
  display: inline-block;
  margin: 10px;
  background-color: #f9f9f9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.artist-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.artist-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.view-details-button {
  display: inline-block;
  padding: 10px 15px;
  text-decoration: none;
  background-color: #4CAF50;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.view-details-button:hover {
  background-color: #45a049;
}
</style>

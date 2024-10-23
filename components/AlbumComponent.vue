<template>
  <div class="album-card">
    <img :src="album.image" alt="Imagen del Álbum" class="album-image" />
    <h3>{{ album.title }}</h3>
    <p>
      <strong>Artista:</strong>
      <router-link
        :to="{ name: 'ArtistDetail', params: { id: album.artistId } }"
        class="artist-link"
      >
        {{ album.artist }}
      </router-link>
    </p>
    <router-link :to="{ name: 'AlbumDetail', params: { id: album.id } }" class="view-details-button">
      Ver Detalles
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    album: {
      type: Object,
      required: true,
    },
    artist: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
.album-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  color: #333333;
  max-width: 300px;
  margin: 10px;
  display: inline-block;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.album-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.album-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.album-card h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}

.album-card p {
  font-size: 16px;
  margin: 5px 0;
}

.album-card strong {
  font-weight: 600;
}

.artist-link {
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  transition: color 0.3s;
}

.artist-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.view-details-button {
  display: inline-block;
  padding: 10px 15px;
  text-decoration: none;
  background-color: #4CAF50;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.view-details-button:hover {
  background-color: #45a049;
}
</style>

<template>
  <div v-if="album" class="album-detail">
    <h2>{{ album.title }}</h2>
    <img :src="album.image.path" alt="Imagen del Álbum" class="album-image" />
    <p>
      <strong>Artista:</strong>
      <router-link :to="{ name: 'ArtistDetail', params: { id: album.artistId } }" class="artist-link">
        {{ album.artist }}
      </router-link>
    </p>
    <p><strong>Año de lanzamiento:</strong> {{ album.release_year }}</p>
    <h3>Canciones:</h3>
    <ul class="song-list">
      <li v-for="(song, index) in album.songs" :key="index">{{ song }}</li>
    </ul>
    <div class="album-actions">
      <button @click="goToEdit" class="btn btn-edit">Editar</button>
      <button @click="deleteAlbum" class="btn btn-delete">Eliminar</button>
    </div>
  </div>
  <div v-else class="loading">Cargando...</div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      album: null,
    };
  },
  created() {
    this.fetchAlbum();
  },
  methods: {
    async fetchAlbum() {
      try {
        const response = await axios.get(
          `http://cms-una.unaux.com/:jazz-music/api/content/item/albums/${this.id}`
        );
        this.album = response.data;
      } catch (error) {
        console.error('Error fetching album:', error);
      }
    },
    goToEdit() {
      this.$router.push(`/albums/edit/${this.id}`);
    },
    async deleteAlbum() {
      if (confirm('¿Estás seguro de que quieres eliminar este álbum?')) {
        try {
          await axios.delete(`http://cms-una.unaux.com/:jazz-music/api/content/item/albums/${this.id}`);
          this.$router.push({ name: 'AlbumsView' });
        } catch (error) {
          console.error('Error deleting album:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.album-detail {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  color: #333333;
}

.album-detail h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
}

.album-detail h3 {
  font-size: 24px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 15px;
}

.album-detail p {
  font-size: 18px;
  line-height: 1.6;
}

.album-detail strong {
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

.album-image {
  width: 100%;
  max-width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.song-list {
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  display: inline-block;
  text-align: left;
}

.song-list li {
  font-size: 18px;
  margin-bottom: 5px;
}

.album-actions {
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  margin: 0 10px 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:active {
  transform: scale(0.98);
}

.btn-edit {
  background-color: #007bff;
  color: #ffffff;
}

.btn-edit:hover {
  background-color: #0069d9;
}

.btn-delete {
  background-color: #dc3545;
  color: #ffffff;
}

.btn-delete:hover {
  background-color: #c82333;
}

.loading {
  text-align: center;
  font-size: 24px;
  margin-top: 50px;
  color: #666666;
}
</style>

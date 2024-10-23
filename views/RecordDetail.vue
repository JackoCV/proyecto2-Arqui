<template>
  <div v-if="record" class="record-detail">
    <h2>{{ record.name }}</h2>
    <img :src="record.image" :alt="record.name" class="record-image" />
    <p><strong>Ubicación:</strong> {{ record.location }}</p>
    <p><strong>Año de fundación:</strong> {{ record.founded }}</p>

    <h3>Artistas:</h3>
    <ul>
      <li v-for="artist in record.artists" :key="artist">
        <router-link :to="{ name: 'ArtistDetail', params: { id: artist } }">
          {{ getArtistName(artist) }}
        </router-link>
      </li>
    </ul>

    <h3>Álbumes:</h3>
    <ul>
      <li v-for="album in record.albums" :key="album">
        <router-link :to="{ name: 'AlbumDetail', params: { id: album } }">
          {{ getAlbumTitle(album) }}
        </router-link>
      </li>
    </ul>

    <div class="record-actions">
      <button @click="goToEdit" class="edit-button">Editar</button>
      <button @click="deleteRecord" class="delete-button">Eliminar</button>
    </div>
  </div>
  <div v-else>Cargando...</div>
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
      record: null,
      artists: [],
      albums: [],
    };
  },
  created() {
    this.fetchRecord();
  },
  methods: {
    async fetchRecord() {
      try {
        const response = await axios.get(`http://cms-una.unaux.com/:jazz-music/api/content/item/label_records/${this.id}`);
        this.record = response.data;
        this.fetchArtists();
        this.fetchAlbums();
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    },
    async fetchArtists() {
      try {
        const response = await axios.get('http://cms-una.unaux.com/:jazz-music/api/content/items/artists');
        this.artists = response.data;
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    },
    async fetchAlbums() {
      try {
        const response = await axios.get('http://cms-una.unaux.com/:jazz-music/api/content/items/albums');
        this.albums = response.data;
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    },
    getArtistName(artistId) {
      const artist = this.artists.find(artist => artist._id === artistId);
      return artist ? artist.name : 'Artista no encontrado';
    },
    getAlbumTitle(albumId) {
      const album = this.albums.find(album => album._id === albumId);
      return album ? album.title : 'Álbum no encontrado';
    },
    goToEdit() {
      this.$router.push(`/label_records/edit/${this.id}`);
    },
    async deleteRecord() {
      if (confirm('¿Estás seguro de que quieres eliminar este sello discográfico?')) {
        try {
          await axios.delete(`http://cms-una.unaux.com/:jazz-music/api/content/item/label_records/${this.id}`);
          this.$router.push({ name: 'RecordsView' });
        } catch (error) {
          console.error('Error deleting record:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
.record-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.record-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
}

.record-actions {
  margin-top: 20px;
}

.edit-button, .delete-button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button {
  background-color: #4CAF50;
  color: white;
}

.edit-button:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #d32f2f;
}
</style>

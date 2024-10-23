<template>
  <div v-if="record" class="record-detail">
    <h2>{{ record.name }}</h2>
    <img :src="record.image" :alt="record.name" class="record-image" />
    <p><strong>Ubicación:</strong> {{ record.location }}</p>
    <p><strong>Año de fundación:</strong> {{ record.founded }}</p>

    <h3>Artistas:</h3>
    <ul class="item-list">
      <li v-for="artist in record.artists" :key="artist">
        <router-link :to="{ name: 'ArtistDetail', params: { id: artist } }" class="item-link">
          {{ getArtistName(artist) }}
        </router-link>
      </li>
    </ul>

    <h3>Álbumes:</h3>
    <ul class="item-list">
      <li v-for="album in record.albums" :key="album">
        <router-link :to="{ name: 'AlbumDetail', params: { id: album } }" class="item-link">
          {{ getAlbumTitle(album) }}
        </router-link>
      </li>
    </ul>

    <div class="record-actions">
      <button @click="goToEdit" class="btn btn-edit">Editar</button>
      <button @click="deleteRecord" class="btn btn-delete">Eliminar</button>
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
      if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
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
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  color: #333333;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.record-detail h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
}

.record-image {
  width: 100%;
  max-width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.item-list {
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  display: inline-block;
  text-align: left;
}

.item-list li {
  font-size: 18px;
  margin-bottom: 5px;
}

.item-link {
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  transition: color 0.3s;
}

.item-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.record-actions {
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  margin: 0 10px 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
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

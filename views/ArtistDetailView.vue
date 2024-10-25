<template>
  <div v-if="artist" class="artist-detail">
    <h2>{{ artist.name }}</h2>
    <img v-if="artist.image" :src="artist.image" :alt="artist.name" class="artist-image" />
    <p><strong>Fecha de nacimiento:</strong> {{ artist.birthDate }}</p>
    <p><strong>Nacionalidad:</strong> {{ artist.nationality }}</p>
    <p><strong>Instrumento:</strong> {{ artist.instrument }}</p>
    <p><strong>Género:</strong> {{ artist.genre }}</p>

    <h3>Álbumes</h3>
    <ul class="item-list">
      <li v-for="album in artistAlbums" :key="album._id">
        <router-link :to="{ name: 'AlbumDetail', params: { id: album._id } }" class="item-link">
          {{ album.title }}
        </router-link>
      </li>
    </ul>

    <h3>Sellos Discográficos</h3>
    <ul class="item-list">
      <li v-for="label in artistLabels" :key="label._id">
        <router-link :to="{ name: 'RecordDetail', params: { id: label._id } }" class="item-link">
          {{ label.name }}
        </router-link>
      </li>
    </ul>

    <div class="artist-actions">
      <button @click="goToEdit" class="btn btn-edit">Editar</button>
      <button @click="deleteArtist" class="btn btn-delete">Eliminar</button>
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
      artist: null,
      artistAlbums: [],
      artistLabels: [],
    };
  },
  created() {
    this.fetchArtist();
  },
  methods: {
    async fetchArtist() {
      try {
        const response = await axios.get(`http://cms-una.unaux.com/api/content/item/artists/${this.id}`);
        this.artist = response.data;

        if (Array.isArray(this.artist.albums)) {
          const albumPromises = this.artist.albums.map(async (albumId) => {
            try {
              const albumResponse = await axios.get(`http://cms-una.unaux.com/api/content/item/albums/${albumId}`);
              return albumResponse.data;
            } catch (error) {
              console.warn(`Álbum con ID ${albumId} no encontrado`);
              return null;
            }
          });
          const albumResults = await Promise.all(albumPromises);
          this.artistAlbums = albumResults.filter(album => album !== null);
        }

        if (Array.isArray(this.artist.label_records)) {
          const labelPromises = this.artist.label_records.map(async (labelId) => {
            try {
              const labelResponse = await axios.get(`http://cms-una.unaux.com/api/content/item/label_records/${labelId}`);
              return labelResponse.data;
            } catch (error) {
              console.warn(`Sello discográfico con ID ${labelId} no encontrado`);
              return null;
            }
          });
          const labelResults = await Promise.all(labelPromises);
          this.artistLabels = labelResults.filter(label => label !== null);
        }

      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    },
    goToEdit() {
      this.$router.push(`/artists/edit/${this.id}`);
    },
    async deleteArtist() {
      if (confirm('¿Estás seguro de que quieres eliminar este artista?')) {
        try {
          await axios.delete(`http://cms-una.unaux.com/api/content/item/artists/${this.id}`);
          this.$router.push({ name: 'ArtistsView' });
        } catch (error) {
          console.error('Error deleting artist:', error);
        }
      }
    },
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.artist-detail {
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

.artist-detail h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
}

.artist-detail h3 {
  font-size: 24px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 15px;
}

.artist-detail p {
  font-size: 18px;
  line-height: 1.6;
}

.artist-detail strong {
  font-weight: 600;
}

.artist-image {
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

/* Botones */
.artist-actions {
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

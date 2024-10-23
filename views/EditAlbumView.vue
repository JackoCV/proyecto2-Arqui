<template>
  <div class="edit-album">
    <h2>{{ isNewAlbum ? 'Crear Nuevo Álbum' : 'Editar Álbum' }}</h2>
    <form @submit.prevent="saveAlbum" class="album-form">
      <!-- Campos existentes -->
      <div class="form-group">
        <label for="title">Título:</label>
        <input v-model="album.title" id="title" required />
      </div>

      <div class="form-group">
        <label for="artist">Artista:</label>
        <select v-model.number="selectedArtistId" id="artist" required>
          <option disabled value="">Seleccione un Artista</option>
          <option v-for="artist in artists" :key="artist._id" :value="artist._id">
            {{ artist.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="release_year">Año de lanzamiento:</label>
        <input v-model="album.release_year" id="release_year" type="number" required />
      </div>

      <!-- Campo para las canciones -->
      <div class="form-group">
        <label for="songs">Canciones:</label>
        <textarea v-model="songsText" id="songs" rows="5" placeholder="Ingresa una canción por línea"></textarea>
      </div>

      <!-- Campo para la imagen -->
      <div class="form-group">
        <label for="image">Imagen del Álbum:</label>
        <input type="file" @change="onFileChange" accept="image/*" id="image" />
      </div>

      <!-- Vista previa de la imagen -->
      <div v-if="imagePreview" class="image-preview-container">
        <img :src="imagePreview" alt="Vista previa de la imagen" class="image-preview" />
      </div>

      <!-- Botones de acción -->
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Guardar</button>
        <button type="button" class="btn btn-secondary" @click="cancel">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      album: {
        id: null,
        title: '',
        artistId: null,
        release_year: null,
        image: '',
      },
      isNewAlbum: true,
      artists: [], // Lista de artistas
      selectedArtistId: null, // Artista seleccionado
      selectedFile: null, // Archivo de imagen seleccionado
      imagePreview: null, // URL de vista previa de la imagen
      songsText: '', // Texto ingresado en el textarea
    };
  },
  created() {
    this.fetchArtists();
    if (this.id) {
      this.isNewAlbum = false;
      this.fetchAlbum();
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.imagePreview = URL.createObjectURL(file);
      } else {
        this.selectedFile = null;
        this.imagePreview = null;
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
    async fetchAlbum() {
      try {
        const response = await axios.get(`http://cms-una.unaux.com/:jazz-music/api/content/item/albums/${this.id}`);
        this.album = response.data;
        this.selectedArtistId = this.album.artistId;

        this.album.id = this.album.id || this.id;

        if (this.album.songs && Array.isArray(this.album.songs)) {
          this.songsText = this.album.songs.join('\n');
        }

        if (this.album.image) {
          this.imagePreview = this.album.image;
        }
      } catch (error) {
        console.error('Error fetching album:', error);
      }
    },

    async saveAlbum() {
      try {
        this.album.artistId = this.selectedArtistId;
        if (!this.album.artistId) {
          alert('Por favor, selecciona un artista válido.');
          return;
        }

        if (this.songsText) {
          this.album.songs = this.songsText
            .split('\n')
            .map((song) => song.trim())
            .filter((song) => song !== '');
        } else {
          this.album.songs = [];
        }

        const formData = new FormData();
        formData.append('title', this.album.title);
        formData.append('artistId', this.album.artistId);
        formData.append('release_year', this.album.release_year);
        formData.append('songs', JSON.stringify(this.album.songs));

        if (this.selectedFile) {
          formData.append('image', this.selectedFile);
        }

        if (!this.isNewAlbum) {
          formData.append('id', this.album.id);
        }

        let response;
        if (this.isNewAlbum) {
          response = await axios.post('http://cms-una.unaux.com/:jazz-music/api/content/items/albums', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const newAlbumId = response.data._id;
          this.$router.push({ name: 'AlbumDetail', params: { id: String(newAlbumId) } });
        } else {
          response = await axios.put(`http://cms-una.unaux.com/:jazz-music/api/content/item/albums/${this.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.$router.push({ name: 'AlbumDetail', params: { id: String(this.id) } });
        }

        console.log('Respuesta del servidor:', response.data);
      } catch (error) {
        console.error('Error saving album:', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      }
    },
    cancel() {
      this.$router.push({ name: 'AlbumsView' });
    },
  },
};
</script>

<style scoped>
.edit-album {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-album h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333333;
  font-size: 24px;
  font-weight: 600;
}

.album-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555555;
  font-weight: 500;
}

input[type='text'],
input[type='number'],
select,
textarea,
input[type='file'] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
  color: #333333;
}

input[type='text']:focus,
input[type='number']:focus,
select:focus,
textarea:focus,
input[type='file']:focus {
  border-color: #66afe9;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.image-preview-container {
  text-align: center;
  margin-top: 20px;
}

.image-preview {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #dddddd;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.btn-secondary {
  background-color: #6c757d;
  color: #ffffff;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

@media (max-width: 600px) {
  .edit-album {
    padding: 15px;
  }

  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    margin-left: 0;
    margin-bottom: 10px;
  }

  .btn:last-child {
    margin-bottom: 0;
  }
}
</style>

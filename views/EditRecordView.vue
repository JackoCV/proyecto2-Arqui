<template>
  <div class="edit-record">
    <h2>{{ isNewRecord ? 'Crear Nueva Disquera' : 'Editar Disquera' }}</h2>
    <form @submit.prevent="saveRecord" class="record-form">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input v-model="record.name" id="name" required />
      </div>
      <div class="form-group">
        <label for="location">Ubicación:</label>
        <input v-model="record.location" id="location" required />
      </div>
      <div class="form-group">
        <label for="founded">Año de fundación:</label>
        <input v-model="record.founded" id="founded" type="number" required />
      </div>

      <!-- Dropdown para Artistas -->
      <div class="form-group">
        <label>Artistas:</label>
        <div class="dropdown" @click="toggleDropdown('artists')">
          <div class="dropdown-selected">
            {{ selectedArtistsNames.length > 0 ? selectedArtistsNames.join(', ') : 'Seleccionar Artistas' }}
            <span class="dropdown-arrow">&#9662;</span>
          </div>
        </div>
        <div v-if="showArtistsDropdown" class="dropdown-options">
          <label v-for="artist in artists" :key="artist._id" class="dropdown-option">
            <input type="checkbox" :value="artist._id" v-model="selectedArtists" />
            {{ artist.name }}
          </label>
        </div>
      </div>

      <!-- Dropdown para Álbumes -->
      <div class="form-group">
        <label>Álbumes:</label>
        <div class="dropdown" @click="toggleDropdown('albums')">
          <div class="dropdown-selected">
            {{ selectedAlbumsTitles.length > 0 ? selectedAlbumsTitles.join(', ') : 'Seleccionar Álbumes' }}
            <span class="dropdown-arrow">&#9662;</span>
          </div>
        </div>
        <div v-if="showAlbumsDropdown" class="dropdown-options">
          <label v-for="album in albums" :key="album._id" class="dropdown-option">
            <input type="checkbox" :value="album._id" v-model="selectedAlbums" />
            {{ album.title }}
          </label>
        </div>
      </div>

      <!-- Campo para la imagen -->
      <div class="form-group">
        <label for="image">Imagen de la Disquera:</label>
        <input type="file" @change="onFileChange" accept="image/*" id="image" />
      </div>

      <!-- Vista previa de la imagen -->
      <div v-if="imagePreview" class="image-preview-container">
        <img :src="imagePreview" alt="Vista previa de la imagen" class="image-preview" />
      </div>

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
      record: {
        id: null,
        name: '',
        location: '',
        founded: '',
        albums: [],
        artists: [],
        image: null,
      },
      isNewRecord: true,
      artists: [], // Lista de artistas disponibles
      albums: [], // Lista de álbumes disponibles
      selectedArtists: [], // IDs de artistas seleccionados
      selectedAlbums: [], // IDs de álbumes seleccionados
      imagePreview: null,
      selectedFile: null,
      showArtistsDropdown: false,
      showAlbumsDropdown: false,
    };
  },
  computed: {
    selectedArtistsNames() {
      return this.artists
        .filter(artist => this.selectedArtists.includes(artist._id))
        .map(artist => artist.name);
    },
    selectedAlbumsTitles() {
      return this.albums
        .filter(album => this.selectedAlbums.includes(album._id))
        .map(album => album.title);
    },
  },
  created() {
    this.fetchArtistsAndAlbums();
    if (this.id) {
      this.isNewRecord = false;
      this.fetchRecord();
    }
  },
  methods: {
    toggleDropdown(type) {
      if (type === 'artists') {
        this.showArtistsDropdown = !this.showArtistsDropdown;
        this.showAlbumsDropdown = false;
      } else if (type === 'albums') {
        this.showAlbumsDropdown = !this.showAlbumsDropdown;
        this.showArtistsDropdown = false;
      }
    },
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
    async fetchArtistsAndAlbums() {
      try {
        const [artistsResponse, albumsResponse] = await Promise.all([
          axios.get('http://cms-una.unaux.com/:jazz-music/api/content/items/artists'),
          axios.get('http://cms-una.unaux.com/:jazz-music/api/content/items/albums'),
        ]);
        this.artists = artistsResponse.data;
        this.albums = albumsResponse.data;
      } catch (error) {
        console.error('Error fetching artists and albums:', error);
      }
    },
    async fetchRecord() {
      try {
        const response = await axios.get(`http://cms-una.unaux.com/:jazz-music/api/content/item/label_records/${this.id}`);
        this.record = response.data;
        this.selectedArtists = this.record.artists || [];
        this.selectedAlbums = this.record.albums || [];

        // Vista previa de la imagen existente
        if (this.record.image) {
          this.imagePreview = this.record.image;
        }
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    },
    async saveRecord() {
      try {
        // Asignar los artistas y álbumes seleccionados
        this.record.artists = Array.isArray(this.selectedArtists) ? this.selectedArtists : [this.selectedArtists];
        this.record.albums = Array.isArray(this.selectedAlbums) ? this.selectedAlbums : [this.selectedAlbums];

        const formData = new FormData();
        formData.append('name', this.record.name);
        formData.append('location', this.record.location);
        formData.append('founded', this.record.founded);
        formData.append('albums', JSON.stringify(this.record.albums));
        formData.append('artists', JSON.stringify(this.record.artists));

        if (this.selectedFile) {
          formData.append('image', this.selectedFile);
        }

        // Incluir el id si es una edición
        if (!this.isNewRecord) {
          formData.append('id', this.record.id);
        }

        let response;
        if (this.isNewRecord) {
          response = await axios.post('http://cms-una.unaux.com/:jazz-music/api/content/items/label_records', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          response = await axios.put(`http://cms-una.unaux.com/:jazz-music/api/content/item/label_records/${this.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        console.log('Respuesta del servidor:', response.data);

        // Redirige a la vista de detalles después de guardar
        this.$router.push({ name: 'RecordDetail', params: { id: response.data._id || this.id } });
      } catch (error) {
        console.error('Error saving record:', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      }
    },
    cancel() {
      this.$router.push({ name: 'RecordsView' });
    },
  },
};
</script>

<style scoped>  
.edit-record {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-record h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333333;
  font-size: 24px;
  font-weight: 600;
}

.record-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555555;
  font-weight: 500;
}

input[type='text'],
input[type='number'],
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
input[type='file']:focus {
  border-color: #66afe9;
  outline: none;
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

/* Estilos para los dropdowns */
.dropdown {
  cursor: pointer;
  user-select: none;
}

.dropdown-selected {
  padding: 10px 12px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  position: relative;
}

.dropdown-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.dropdown-options {
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  z-index: 1;
  margin-top: 5px;
}

.dropdown-option {
  display: flex;
  align-items: center;
  padding: 8px 12px;
}

.dropdown-option:hover {
  background-color: #f1f1f1;
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
  .edit-record {
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

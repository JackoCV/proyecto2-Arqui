<template>
  <div class="edit-artist">
    <h2>{{ isNewArtist ? 'Crear Nuevo Artista' : 'Editar Artista' }}</h2>
    <form
      class="artist-form"
      @submit.prevent="saveArtist"
    >
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input
          id="name"
          v-model="artist.name"
          required
        >
      </div>

      <div class="form-group">
        <label for="birthDate">Fecha de nacimiento:</label>
        <input
          id="birthDate"
          v-model="artist.birthDate"
          type="date"
          class="small-input"
          required
        >
      </div>

      <div class="form-group">
        <label for="nationality">Nacionalidad:</label>
        <input
          id="nationality"
          v-model="artist.nationality"
          required
        >
      </div>

      <div class="form-group">
        <label for="instrument">Instrumento:</label>
        <input
          id="instrument"
          v-model="artist.instrument"
          required
        >
      </div>

      <div class="form-group">
        <label for="genre">Género:</label>
        <input
          id="genre"
          v-model="artist.genre"
          required
        >
      </div>

      <!-- Dropdown para álbumes -->
      <div
        ref="albumsDropdown"
        class="form-group"
      >
        <label>Álbumes:</label>
        <div
          class="dropdown"
          @click="toggleDropdown('albums')"
        >
          <div class="dropdown-selected">
            {{ selectedAlbumsNames.length > 0 ? selectedAlbumsNames.join(', ') : 'Seleccionar Álbumes' }}
            <span class="dropdown-arrow">&#9662;</span>
          </div>
        </div>
        <div
          v-if="showAlbumsDropdown"
          class="dropdown-options"
        >
          <label
            v-for="album in albums"
            :key="album._id"
            class="dropdown-option"
          >
            <input
              v-model="selectedAlbums"
              type="checkbox"
              :value="album._id"
            >
            {{ album.title }}
          </label>
        </div>
      </div>

      <!-- Dropdown para sellos discográficos -->
      <div
        ref="labelsDropdown"
        class="form-group"
      >
        <label>Sellos Discográficos:</label>
        <div
          class="dropdown"
          @click="toggleDropdown('labels')"
        >
          <div class="dropdown-selected">
            {{ selectedLabelsNames.length > 0 ? selectedLabelsNames.join(', ') : 'Seleccionar Sellos Discográficos' }}
            <span class="dropdown-arrow">&#9662;</span>
          </div>
        </div>
        <div
          v-if="showLabelsDropdown"
          class="dropdown-options"
        >
          <label
            v-for="label in labels"
            :key="label._id"
            class="dropdown-option"
          >
            <input
              v-model="selectedLabelRecords"
              type="checkbox"
              :value="label._id"
            >
            {{ label.name }}
          </label>
        </div>
      </div>

      <!-- Campo para la imagen -->
      <div class="form-group">
        <label for="image">Imagen del Artista:</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          @change="onFileChange"
        >
      </div>

      <!-- Vista previa de la imagen -->
      <div
        v-if="imagePreview"
        class="image-preview-container"
      >
        <img
          :src="imagePreview"
          alt="Vista previa de la imagen"
          class="image-preview"
        >
      </div>

      <!-- Botones de acción -->
      <div class="form-actions">
        <button
          type="submit"
          class="btn btn-primary"
        >
          Guardar
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="cancel"
        >
          Cancelar
        </button>
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
      artist: {
        id: null,
        name: '',
        birthDate: '',
        nationality: '',
        instrument: '',
        genre: '',
        image: '',
        albums: [],
        label_records: []
      },
      albums: [], // Lista de álbumes
      labels: [], // Lista de sellos discográficos
      selectedAlbums: [], // IDs de álbumes seleccionados
      selectedLabelRecords: [], // IDs de sellos discográficos seleccionados
      isNewArtist: true,
      selectedFile: null, // Archivo de imagen seleccionado
      imagePreview: null, // URL de vista previa de la imagen
      showAlbumsDropdown: false, // Controla si el dropdown de álbumes está visible
      showLabelsDropdown: false, // Controla si el dropdown de sellos discográficos está visible
    };
  },
  computed: {
    selectedAlbumsNames() {
      return this.albums
        .filter(album => this.selectedAlbums.includes(album._id))
        .map(album => album.title);
    },
    selectedLabelsNames() {
      return this.labels
        .filter(label => this.selectedLabelRecords.includes(label._id))
        .map(label => label.name);
    },
  },
  created() {
    this.fetchAlbumsAndLabels();
    if (this.id) {
      this.isNewArtist = false;
      this.fetchArtist();
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleDropdown(type) {
      if (type === 'albums') {
        this.showAlbumsDropdown = !this.showAlbumsDropdown;
        this.showLabelsDropdown = false;
      } else if (type === 'labels') {
        this.showLabelsDropdown = !this.showLabelsDropdown;
        this.showAlbumsDropdown = false;
      }
    },
    handleClickOutside(event) {
      const albumsDropdown = this.$refs.albumsDropdown;
      const labelsDropdown = this.$refs.labelsDropdown;

      if (albumsDropdown && !albumsDropdown.contains(event.target)) {
        this.showAlbumsDropdown = false;
      }
      if (labelsDropdown && !labelsDropdown.contains(event.target)) {
        this.showLabelsDropdown = false;
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
    async fetchAlbumsAndLabels() {
      try {
        const albumsResponse = await axios.get('http://cms-una.unaux.com/:jazz-music/api/content/items/albums');
        const labelsResponse = await axios.get('http://cms-una.unaux.com/:jazz-music/api/content/items/labels');
        this.albums = albumsResponse.data;
        this.labels = labelsResponse.data;
      } catch (error) {
        console.error('Error fetching albums and labels:', error);
      }
    },
    async fetchArtist() {
      try {
        const response = await axios.get(`http://cms-una.unaux.com/:jazz-music/api/content/item/artists/${this.id}`);
        this.artist = response.data;
        this.selectedAlbums = this.artist.albums || [];
        this.selectedLabelRecords = this.artist.label_records || [];

        this.artist.id = this.artist.id || this.id;

        if (this.artist.image) {
          this.imagePreview = this.artist.image;
        }
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    },

    async saveArtist() {
      try {
        this.artist.albums = Array.isArray(this.selectedAlbums) ? this.selectedAlbums : [this.selectedAlbums];
        this.artist.label_records = Array.isArray(this.selectedLabelRecords) ? this.selectedLabelRecords : [this.selectedLabelRecords];

        const formData = new FormData();
        formData.append('name', this.artist.name);
        formData.append('birthDate', this.artist.birthDate);
        formData.append('nationality', this.artist.nationality);
        formData.append('instrument', this.artist.instrument);
        formData.append('genre', this.artist.genre);
        formData.append('albums', JSON.stringify(this.artist.albums));
        formData.append('label_records', JSON.stringify(this.artist.label_records));

        if (this.selectedFile) {
          formData.append('image', this.selectedFile);
        }

        if (!this.isNewArtist) {
          formData.append('id', this.artist.id);
        }

        let response;
        if (this.isNewArtist) {
          response = await axios.post('http://cms-una.unaux.com/:jazz-music/api/content/items/artists', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const newArtistId = response.data._id;
          this.$router.push({ name: 'ArtistDetail', params: { id: String(newArtistId) } });
        } else {
          response = await axios.put(`http://cms-una.unaux.com/:jazz-music/api/content/item/artists/${this.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.$router.push({ name: 'ArtistDetail', params: { id: String(this.id) } });
        }

        console.log('Respuesta del servidor:', response.data);
      } catch (error) {
        console.error('Error saving artist:', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      }
    },
    cancel() {
      this.$router.push({ name: 'ArtistsView' });
    }
  }
};
</script>

<style scoped>
.edit-artist {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-artist h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333333;
  font-size: 24px;
  font-weight: 600;
}

.artist-form {
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
input[type='date'],
input[type='file'],
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
  color: #333333;
}

input[type='text']:focus,
input[type='date']:focus,
select:focus,
input[type='file']:focus {
  border-color: #66afe9;
  outline: none;
}

input[type='date'] {
  max-width: 200px; 
  padding: 10px 12px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
  color: #333333;
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
  .edit-artist {
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

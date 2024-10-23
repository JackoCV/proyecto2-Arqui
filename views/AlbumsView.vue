<template>
  <div class="albums-view">
    <h1 class="title">Álbumes</h1>
    <button class="btn btn-primary" @click="newAlbum">Crear Nuevo Álbum</button>
    <div class="albums-grid">
      <AlbumComponent
        v-for="album in albums"
        :key="album._id"
        :album="album"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AlbumComponent from "../components/AlbumComponent.vue";

export default {
  components: {
    AlbumComponent,
  },
  data() {
    return {
      albums: [],
    };
  },
  created() {
    this.fetchAlbums();
  },
  methods: {
    async fetchAlbums() {
      try {
        const response = await axios.get("http://cms-una.unaux.com/:jazz-music/api/content/items/albums");
        this.albums = response.data.entries; // Ajustado para la estructura de Cockpit
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    },
    newAlbum() {
      this.$router.push('/albums/new');
    },
  },
};
</script>

<style scoped>
.albums-view {
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 20px;
  animation: fadeInDown 0.5s ease-in-out;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  animation: fadeInUp 0.5s ease-in-out;
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

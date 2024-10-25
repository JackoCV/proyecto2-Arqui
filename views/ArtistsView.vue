<template>
  <div class="artists-view">
    <h1>Artistas</h1>
    <button class="btn btn-primary" @click="newArtist">Crear Nuevo Artista</button>
    <div class="artists-grid">
      <ArtistComponent
        v-for="artist in artists"
        :key="artist._id"
        :artist="artist"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ArtistComponent from "../components/ArtistComponent.vue";

export default {
  components: {
    ArtistComponent,
  },
  data() {
    return {
      artists: [],
    };
  },
  created() {
    this.fetchArtists();
  },
  methods: {
    async fetchArtists() {
      try {
        const response = await axios.get("http://cms-una.unaux.com/api/content/items/artists");
        this.artists = response.data;
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    },
    newArtist() {
      this.$router.push('/artists/new');
    },
  },
};
</script>

<style scoped>
.artists-view {
  padding: 20px;
  text-align: center;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
}
</style>

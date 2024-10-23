<template>
  <div v-if="artist" class="artist-detail">
    <h2>{{ artist.name }}</h2>
    <img :src="artist.image" :alt="artist.name" class="artist-image" v-if="artist.image" />
    <p>{{ artist.bio }}</p>
    <h3>Álbumes:</h3>
    <ul>
      <li v-for="album in artistAlbums" :key="album._id">
        <router-link :to="{ name: 'AlbumDetail', params: { id: album._id } }">
          {{ album.title }}
        </router-link>
      </li>
    </ul>
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
      artist: null,
      artistAlbums: [], // Álbumes del artista
    };
  },
  created() {
    this.fetchArtist();
  },
  methods: {
    async fetchArtist() {
      try {
        const response = await axios.get(`http://cms-una.unaux.com/:jazz-music/api/content/item/artists/${this.id}`);
        this.artist = response.data;

        if (this.artist.albums && Array.isArray(this.artist.albums)) {
          const albumPromises = this.artist.albums.map(async (albumId) => {
            try {
              const albumResponse = await axios.get(`http://cms-una.unaux.com/:jazz-music/api/content/item/albums/${albumId}`);
              return albumResponse.data;
            } catch (error) {
              console.warn(`Álbum con ID ${albumId} no encontrado`);
              return null;
            }
          });
          const albumResults = await Promise.all(albumPromises);
          this.artistAlbums = albumResults.filter((album) => album !== null);
        }
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    },
  },
};
</script>

<style scoped>
.artist-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.artist-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>

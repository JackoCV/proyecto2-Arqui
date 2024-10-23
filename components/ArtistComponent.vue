<template>
    <div class="artist">
      <h3>{{ artist.name }}</h3>
      <img :src="artist.image" alt="Imagen del Artista" />
      <NuxtLink :to="`/artists/${artist._id}`">Ver detalles</NuxtLink>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      artist: Object
    }
  }
  </script>
  
  <style scoped>
  .artist {
    width: 200px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  .artist img {
    width: 100%;
    height: auto;
  }
  </style>
  
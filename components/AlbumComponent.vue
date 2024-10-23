<template>
    <div class="album">
      <h3>{{ album.title }}</h3>
      <img :src="album.image" alt="Imagen del Álbum" />
      <NuxtLink :to="`/albums/${album._id}`">Ver detalles</NuxtLink>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      album: Object
    }
  }
  </script>
  
  <style scoped>
  .album {
    width: 200px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  .album img {
    width: 100%;
    height: auto;
  }
  </style>
  
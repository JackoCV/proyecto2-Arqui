<template>
    <div class="record">
      <h3>{{ record.name }}</h3>
      <img :src="record.image" alt="Imagen de la disquera" class="record-image" />
      <NuxtLink :to="`/records/${record._id}`">Ver detalles</NuxtLink>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      record: Object
    }
  }
  </script>
  
  <style scoped>
  .record {
    width: 200px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  
  .record img {
    width: 100%;
    height: auto;
  }
  </style>
  
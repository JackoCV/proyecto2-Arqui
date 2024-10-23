<template>
    <div class="record-card">
      <img :src="record.image || '/images/default-image.jpg'" alt="Record Cover" class="record-image" />
      <h3>{{ record.name || 'Unknown Label' }}</h3>
      <p>Ubicación: {{ record.location || 'Unknown Location' }}</p>
      <router-link :to="{ name: 'RecordDetail', params: { id: record.id } }" class="view-details-button">
        Ver Detalles
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      record: {
        type: Object,
        required: true,
      },
    },
    methods: {
      goToDetail() {
        if (this.record.id) {
          this.$router.push({ name: 'RecordDetail', params: { id: this.record.id } });
        } else {
          console.error('El parámetro id está ausente');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .record-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    margin-bottom: 20px;
    max-width: 300px;
    display: inline-block;
    margin: 10px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  .record-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
  
  .record-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .view-details-button {
    display: inline-block;
    padding: 10px 15px;
    text-decoration: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 4px;
    transition: background-color 0.3s;
    margin-top: 10px;
  }
  
  .view-details-button:hover {
    background-color: #45a049;
  }
  </style>
  
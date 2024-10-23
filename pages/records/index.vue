<template>
    <div>
      <h2>Disqueras</h2>
      <div class="record-list">
        <RecordComponent v-for="record in records" :key="record._id" :record="record" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import RecordComponent from '~/components/RecordComponent.vue'
  
  const records = ref([])
  
  onMounted(async () => {
    try {
      const response = await axios.get('http://cms-una.unaux.com/jazz-music/api/content/items/records')
      records.value = response.data
    } catch (error) {
      console.error('Error al obtener la lista de disqueras:', error)
    }
  })
  </script>
  
  <style scoped>
  .record-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  </style>
  
<template>
  <div class="records-view">
    <h1>Disqueras</h1>
    <button class="btn btn-primary" @click="newRecord">Nueva Disquera</button>
    <div class="records-grid">
      <RecordComponent 
        v-for="record in records" 
        :key="record._id" 
        :record="record" 
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import RecordComponent from '../components/RecordComponent.vue';

export default {
  components: {
    RecordComponent,
  },
  data() {
    return {
      records: [],
    };
  },
  created() {
    this.fetchRecords();
  },
  methods: {
    async fetchRecords() {
      try {
        const response = await axios.get('http://cms-una.unaux.com/:jazz-music/api/content/items/label_records');
        this.records = response.data;
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    },
    newRecord() {
      this.$router.push('/label_records/new');
    },
  },
};
</script>

<style scoped>
.records-view {
  padding: 20px;
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

.records-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>

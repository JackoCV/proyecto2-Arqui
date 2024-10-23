import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Asegúrate de que este archivo existe

// Crear y montar la aplicación Vue
createApp(App)
  .use(router)
  .mount('#app')

<template>
    <div id="app">
      <header>
        <h1>Catálogo de Jazz</h1>
        <nav>
          <router-link to="/albums">Álbumes</router-link>
          <router-link to="/artists">Artistas</router-link>
          <router-link to="/records">Disqueras</router-link>
        </nav>
      </header>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style scoped>
  #app {
    text-align: center;
    padding: 40px;
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
    min-height: 100vh;
  }
  
  header {
    margin-bottom: 40px;
    background-color: #333;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: #fff;
    animation: slideIn 1s ease-out;
  }
  
  h1 {
    font-size: 48px;
    font-weight: bold;
    margin: 0;
    letter-spacing: 2px;
    animation: fadeIn 2s ease-in-out;
  }
  
  nav {
    margin-top: 20px;
  }
  
  nav a {
    margin: 0 20px;
    text-decoration: none;
    color: #fff;
    font-size: 24px;
    font-weight: 500;
    transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  
  nav a:hover {
    color: #42b983;
    transform: scale(1.1);
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-50px);
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
  
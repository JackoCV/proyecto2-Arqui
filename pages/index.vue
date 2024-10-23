<template>
  <div class="container">
    <h1>Bienvenido a la Biblioteca de Música</h1>
    <ul>
      <li><NuxtLink to="/albums">Ver Álbumes</NuxtLink></li>
      <li><NuxtLink to="/artists">Ver Artistas</NuxtLink></li>
      <li><NuxtLink to="/records">Ver Disqueras</NuxtLink></li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>

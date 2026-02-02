<script setup lang="ts">
// Le router gère maintenant l'affichage des composants
</script>

<template>
  <!-- Musique de fond globale -->
  <audio autoplay loop>
    <source src="/06 Alicia Keys - If I Ain t Got You.mp3" type="audio/mpeg" />
  </audio>

  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<script setup lang="ts">
import { ref, onMounted, provide } from "vue";

// Le router gère maintenant l'affichage des composants
const audioRef = ref<HTMLAudioElement | null>(null);
const musicStarted = ref(false);

const startMusic = () => {
  if (audioRef.value && !musicStarted.value) {
    audioRef.value.play().catch(() => console.log("Musique en attente"));
    musicStarted.value = true;
  }
};

// Fournir la fonction startMusic à tous les composants enfants
provide("startMusic", startMusic);

onMounted(() => {
  // Écouter tous les clics sur l'application
  const handleGlobalClick = () => {
    startMusic();
  };

  // Ajouter l'écoute sur toute l'application
  document.addEventListener("click", handleGlobalClick);
  document.addEventListener("touchstart", handleGlobalClick);

  // Essayer aussi automatiquement
  setTimeout(startMusic, 1000);
});
</script>

<template>
  <!-- Musique de fond globale -->
  <audio ref="audioRef" autoplay loop preload="auto">
    <source
      src="https://res.cloudinary.com/datfkvxvz/video/upload/v1770062613/06_Alicia_Keys_-_If_I_Ain_t_Got_You_qspbcq.mp3"
      type="audio/mpeg"
    />
  </audio>

  <router-view />
</template>

<style scoped>
.music-prompt {
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(255, 105, 180, 0.9);
  color: white;
  padding: 10px 15px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  z-index: 1000;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

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

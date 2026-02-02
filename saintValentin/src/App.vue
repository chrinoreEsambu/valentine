<script setup lang="ts">
import { ref, onMounted } from "vue";

// Le router gère maintenant l'affichage des composants
const audioRef = ref<HTMLAudioElement | null>(null);
const musicStarted = ref(false);

const startMusic = () => {
  if (audioRef.value && !musicStarted.value) {
    audioRef.value.play().catch((err) => console.log("Erreur audio:", err));
    musicStarted.value = true;
  }
};

onMounted(() => {
  // Essayer de démarrer la musique automatiquement
  setTimeout(startMusic, 1000);

  // Ajouter des listeners pour les interactions utilisateur
  const handleInteraction = () => {
    startMusic();
    document.removeEventListener("click", handleInteraction);
    document.removeEventListener("touchstart", handleInteraction);
    document.removeEventListener("keydown", handleInteraction);
  };

  document.addEventListener("click", handleInteraction);
  document.addEventListener("touchstart", handleInteraction);
  document.addEventListener("keydown", handleInteraction);
});
</script>

<template>
  <!-- Musique de fond globale -->
  <audio ref="audioRef" loop preload="auto">
    <source src="/06 Alicia Keys - If I Ain t Got You.mp3" type="audio/mpeg" />
  </audio>

  <!-- Bouton pour démarrer la musique si nécessaire -->
  <div v-if="!musicStarted" class="music-prompt" @click="startMusic">
    🎵 Cliquez pour la musique 🎵
  </div>

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

<template>
  <div class="container">
    <!-- Images qui tombent -->
    <div class="falling-images">
      <img
        v-for="item in fallingItems"
        :key="item.id"
        :src="item.src"
        class="falling-item"
        :style="item.style"
      />
    </div>

    <h1>
      Ton cœur est généreux ❤️ et ton sourire 😄 me rend heureux, juste en étant
      toi ✨💛
    </h1>
    <div>
      <img v-if="isGif" :src="currentImage" alt="Image GIF" class="media" />
      <video
        v-else
        :src="currentImage"
        autoplay
        muted
        class="media"
        @ended="onVideoEnd"
      ></video>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import bou1 from "../assets/bou1.png";
import bou2 from "../assets/bou2.png";
import bou3 from "../assets/bou3.png";

interface FallingItem {
  id: number;
  src: string;
  style: {
    left: string;
    animationDuration: string;
    width: string;
    height: string;
  };
}

const currentImage = ref("/after1.gif");
const fallingItems = ref<FallingItem[]>([]);

const bouImages = [bou1, bou2, bou2, bou2, bou2, bou3] as string[]; // Plus de bou2 car c'est le plus beau

const isGif = computed(() => currentImage.value.endsWith(".gif"));

const createFallingItem = (): FallingItem => {
  const randomImage = bouImages[Math.floor(Math.random() * bouImages.length)];
  const leftPosition = Math.random() * 90; // Position entre 0 et 90%
  const animationDuration = 3 + Math.random() * 4; // Entre 3 et 7 secondes - vitesse parfaite
  const size = 30 + Math.random() * 40; // Taille entre 30 et 70px - plus grande !

  return {
    id: Date.now() + Math.random(), // ID unique généré ici
    src: randomImage,
    style: {
      left: `${leftPosition}%`,
      animationDuration: `${animationDuration}s`,
      width: `${size}px`,
      height: `${size}px`,
    },
  };
};

const addFallingItem = () => {
  const newItem = createFallingItem();
  fallingItems.value.push(newItem);

  // Supprimer l'item après l'animation (un peu plus de temps pour être sûr)
  setTimeout(() => {
    fallingItems.value = fallingItems.value.filter(
      (item) => item.id !== newItem.id,
    );
  }, 10000);
};

const switchToNext = () => {
  currentImage.value =
    currentImage.value === "/after1.gif" ? "/after2.mp4" : "/after1.gif";
  if (isGif.value) {
    setTimeout(switchToNext, 2000);
  }
};

const onVideoEnd = () => {
  switchToNext();
};

onMounted(() => {
  setTimeout(switchToNext, 2000);

  // Démarrer la pluie d'images - elle continue sans s'arrêter !
  setInterval(addFallingItem, 800); // Pas de variable pour pas l'interrompre
});
</script>

<style>
.container {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.falling-images {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.falling-item {
  position: absolute;
  top: -50px;
  animation: fall linear;
  opacity: 0.8;
}

@keyframes fall {
  0% {
    transform: translateY(-50px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

div {
  border-radius: 10px;
}

h1 {
  font-size: 20px;
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 20px;
}

.media {
  height: 200px;
  border-radius: 15px;
  position: relative;
  z-index: 2;
  display: block;
  margin: 0 auto;
}
</style>

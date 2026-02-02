<template>
  <div>
    <h1>veux tu etre ma valentine ? 🥹😍😘</h1>
    <div>
      <img src="/before.gif" alt="" class="before" />
    </div>
    <div>
      <button @click="goto" id="ouibtt">oui</button>
      <button @click="nonbtt" class="main">non</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();
let taille = 3;

const goto = () => {
  router.push("/corinne");
};
const nonbtt = () => {
  taille += 0.9;
  const btt = document.getElementById("ouibtt");
  if (btt) {
    btt.style.transform = `scale(${taille})`;
  }
};
</script>

<style>
h1 {
  color: rgb(255, 0, 140);
}
.before {
  height: 200px;
}
.main {
  background-color: red;
}
</style>

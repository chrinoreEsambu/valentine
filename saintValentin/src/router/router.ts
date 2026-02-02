import { createRouter, createWebHistory } from "vue-router";
import corineComp from "../components/corine.vue";
import HelloWorld from "../components/HelloWorld.vue";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/corinne", component: corineComp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

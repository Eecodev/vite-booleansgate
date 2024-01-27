
import { createRouter, createWebHistory } from 'vue-router'
import ArenaView from '../views/ArenaView.vue'
import HomeView from '../views/HomeView.vue'
import TypesView from '../views/TypesView.vue'
import CharactersView from '../views/CharactersView.vue'
import ItemsView from '../views/ItemsView.vue'
import ItemView from "../views/ItemView.vue";
import CharacterView from "../views/CharacterView.vue";
import TypeView from "../views/TypeView.vue";




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/arena',
      name: 'arena',
      component: ArenaView
    },
    {
      path: "/types",
      name: "types",
      component: TypesView,
    },

    {
      path: "/characters",
      name: "characters",
      component: CharactersView,
    },
    {
      path: "/items",
      name: "items",
      component: ItemsView,
    },
    {
      path: "/characters/:id",
      name: "character",
      component: CharacterView,
    },
    {
      path: "/items/:id",
      name: "item",
      component: ItemView,
    },

    {
      path: "/types/:id",
      name: "type",
      component: TypeView,
    },


  ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TypesView from '../views/TypesView.vue'
import CharactersView from '../views/CharactersView.vue'
import ItemsView from '../views/ItemsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {

      path: '/types',
      name: 'types',
      component: TypesView
    },

    {
      path: '/characters',
      name: 'characters',
      component: CharactersView
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsView
    },
  ]
})

export default router

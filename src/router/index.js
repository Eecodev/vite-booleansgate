import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TypeComponentVue from '@/components/TypeComponent.vue'
import CharactersView from '../views/CharactersView.vue'


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
      component: TypeComponentVue
    },
    

      path: '/characters',
      name: 'characters',
      component: CharactersView
    },
  ]
})

export default router

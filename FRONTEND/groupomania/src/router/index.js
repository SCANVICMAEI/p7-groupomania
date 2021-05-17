import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue';
import Tchat from '@/views/Tchat.vue';
// import NavBar from '@/component/NavBar.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path:'/Tchat',
    name:'Tchat',
    component:
    Tchat,
    // NavBar,
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

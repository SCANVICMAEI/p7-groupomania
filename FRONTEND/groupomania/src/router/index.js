import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/tchat',
    name: 'Tchat',
    component:() => import ('../views/Tchat.vue'),
    // meta: {
    //   requireAuth: true,
    // },
    props:true
  },
  {
    path: '/profil',
    name: 'Profil',
    component:() => import ('../views/Profil.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

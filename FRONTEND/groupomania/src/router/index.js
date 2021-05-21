import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true,
    },
  },
 
  {
    path: '/tchat',
    name: 'Tchat',
    component:() => import ('../views/Tchat.vue'),
    meta: {
      requireAuth: true,
    },
    props:true
  },
  {
    path: '/profil',
    name: 'Profil',
    component:() => import ('../views/Profil.vue')
  }
];

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!auth.loggedIn()) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // make sure to always call next()!
//   }
// })


// router.beforeEach((to, from, next) => {
//   const authenticatedUser = null;
//   const requiresAuth = to.matched.some(route => route.meta.requiresAuth);

//   if (requiresAuth && ! authenticatedUser) next('login')
//   else next();
// });


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

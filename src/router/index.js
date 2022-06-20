import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function lazyLoad(view) {
  return () => import(`../views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'default' },
    component: lazyLoad('HomeView'),
  },
  {
    path: '/about',
    name: 'about',
    meta: { layout: 'default' },
    component: lazyLoad('AboutView'),
  },
  {
    path: '/Meus_Pedidos',
    name: 'Meus Pedidos',
    meta: { layout: 'default' },
    component: lazyLoad('MyRequests'),
  },
  {
    path: '/Pedidos',
    name: 'Pedidos',
    meta: { layout: 'default' },
    component: lazyLoad('Requests'),
  },
  {
    path: '/Admin',
    name: 'Admin',
    meta: { layout: 'default' },
    component: lazyLoad('Admin'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

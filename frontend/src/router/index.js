import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Index', component: () => import('../views/Index.vue') },
  { path: '/notfound', name: 'NotFound', component: () => import('../views/NotFound.vue') },
  { path: '/employees', name: 'Employees', component: () => import('../views/Employees.vue') },
  { path: '/employees/:id', name: 'View Employee', component: () => import('../views/ViewEmployee.vue') },
  { path: '/clients', name: 'Clients', component: () => import('../views/Clients.vue') },
  { path: '/clients/:id', name: 'View Client', component: () => import('../views/ViewClient.vue') },
  { path: '/engagements', name: 'Engagements', component: () => import('../views/Engagements.vue') },
  { path: '/engagements/:id', name: 'View Engagement', component: () => import('../views/ViewEngagement.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

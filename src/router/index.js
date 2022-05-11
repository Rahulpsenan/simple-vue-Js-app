import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/Pages/Login.vue'
import PageNotFound from '@/Errors/NotFound.vue'
import Dashboard from '@/Pages/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Login', component: Login, meta:{ public:false } },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta:{ public:true } },

  { path: "*", component: PageNotFound,meta: { public: false }},
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router

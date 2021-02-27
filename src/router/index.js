import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login'

async function guard(to, from, next) {
  let token = localStorage.getItem('_accessToken');
  await axios.get('check-auth', {
    headers: {
      Authorization: token ? token : null
    }
  }).then(res => null)
    .catch(e => {
      if (e.response.data.message == 'unauthorize') {
        localStorage.removeItem('_accessToken')
        localStorage.removeItem('_userData');
        token = null;
      }
    })

  if (token === null || token === 'null' || token == undefined || token == '') {
    next({ name: 'Login' })
  }
  else next()
}

const routes = [
  {
    path: '/',
    name: 'Registration',
    component: () => import(/* webpackChunkName: "Registration" */ '../views/Registration.vue'),
  },

  {
    path: '/edit-registration/:id',
    name: 'EditRegistration',
    beforeEnter: guard,
    component: () => import(/* webpackChunkName: "EditRegistration" */ '../views/EditRegistration.vue'),
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    beforeEnter: guard,
    component: () => import(/* webpackChunkName: "layout" */ '../layouts/Default.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

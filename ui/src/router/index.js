import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/user/SignIn';
import SignUp from '../views/user/SignUp';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    icon: 'mdi-home',
    main: true,
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    icon: 'mdi-information',
    main: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/users/sign-in',
    name: 'Sign In',
    icon: 'mdi-login',
    component: SignIn
  },
  {
    path: '/users/sign-up',
    name: 'Sign Up',
    icon: 'mdi-account-plus',
    component: SignUp
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router

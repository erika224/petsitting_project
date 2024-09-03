import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
import RegisterPage from '../views/Register.vue'
import LoginPage from '../views/Login.vue'
import SitterSearch from '../views/SitterSearch.vue' 
import Profile from '@/views/Profile.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true } 
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/sitter-search',
    name: 'SitterSearch',
    component: SitterSearch,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');  // ログイン状態を確認
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');  // ログインしていない場合、ログインページにリダイレクト
  } else {
    next();  // それ以外の場合はそのまま進む
  }
});


export default router;
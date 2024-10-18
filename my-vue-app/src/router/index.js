import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Dashboard from '../components/Dashboard.vue'; // Assuming you have a Dashboard component

const routes = [
  { path: '/', component: Home }, // Home page as login
  { path: '/dashboard', component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

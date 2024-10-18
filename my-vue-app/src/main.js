import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Import Pinia
import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router
import App from './App.vue';
import router from './router'; // Import your router configuration
import './style.css'

// Create a new Pinia store instance
const pinia = createPinia();

// Create the Vue app instance
const app = createApp(App);

// Use the Pinia store
app.use(pinia);

// Use the router
app.use(router);

// Mount the app
app.mount('#app');

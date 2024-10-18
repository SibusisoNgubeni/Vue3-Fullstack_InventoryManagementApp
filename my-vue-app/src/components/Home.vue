<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  
  if (username.value === 'Lortech' && password.value === 'Lortech@2024') {
    router.push('/dashboard'); 
  } else {
    alert('Invalid username or password');
  }
};
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-6">Welcome to Our Inventory Management App</h1>
        <p class="text-gray-600 text-center mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. 
          Sed bibendum nisl at urna fermentum, sit amet aliquet arcu luctus. 
          Fusce eget ipsum nec dui consequat malesuada.
        </p>
    
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username:</label>
            <input 
              type="text" 
              v-model="username" 
              required 
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
            <input 
              type="password" 
              v-model="password" 
              required 
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
          </div>
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </template>
  

 
  
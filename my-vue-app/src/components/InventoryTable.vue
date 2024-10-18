<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useRouter } from 'vue-router';

// Define props to receive items data
const props = defineProps({
  items: Array,
});

// Define emits for parent communication
const emit = defineEmits(['editItem', 'deleteItem', 'addItem']);

// Functions to emit edit and delete events
const editItem = (item) => {
  emit('editItem', item);
};

const deleteItem = (item) => {
  emit('deleteItem', item);
};

// Logout function
const router = useRouter();
const logout = () => {
  localStorage.removeItem('user'); 
  router.push('/'); // Redirect to the home (login) page
};

// Modal visibility state
const showModal = ref(false);

// Reactive variables for new item data
const itemName = ref('');
const itemDescription = ref('');
const itemPrice = ref(0);
const itemQuantity = ref(0);

</script>

<template>
  <div class="container mx-auto p-6 w-full h-screen">
    <h1 class="text-3xl font-bold text-center mb-4">Dashboard</h1>
    <p class="text-center text-lg mb-6">Welcome, Lortech!</p>


    <table class="min-w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mx-auto">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="py-3 px-4 text-left">Name</th>
          <th class="py-3 px-4 text-left">Description</th>
          <th class="py-3 px-4 text-left">Price</th>
          <th class="py-3 px-4 text-left">Quantity</th>
          <th class="py-3 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-b hover:bg-gray-100">
          <td class="py-3 px-4">{{ item.name }}</td>
          <td class="py-3 px-4">{{ item.description }}</td>
          <td class="py-3 px-4">{{ item.price }}</td>
          <td class="py-3 px-4">{{ item.quantity }}</td>
          <td class="py-3 px-4">
            <button @click="editItem(item)" class="bg-yellow-500 text-white font-semibold py-1 px-3 rounded hover:bg-yellow-600">Edit</button>
            <button @click="deleteItem(item)" class="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for adding a new item -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4">Add New Item</h2>
        <form @submit.prevent="addItem">
          <input v-model="itemName" placeholder="Item Name" class="border p-2 w-full mb-4" required />
          <input v-model="itemDescription" placeholder="Description" class="border p-2 w-full mb-4" required />
          <input v-model.number="itemPrice" type="number" placeholder="Price" class="border p-2 w-full mb-4" required />
          <input v-model.number="itemQuantity" type="number" placeholder="Quantity" class="border p-2 w-full mb-4" required />
          <div class="flex justify-between">
            <button type="button" @click="closeModal" class="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Add Item</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
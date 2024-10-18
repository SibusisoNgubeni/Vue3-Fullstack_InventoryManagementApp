<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useRouter } from 'vue-router';

// Define props to receive items data
const props = defineProps({
  items: Array,
});

// Define emits for parent communication
const emit = defineEmits(['editItem', 'deleteItem']);

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
  // Clear user data if necessary (e.g., from localStorage)
  localStorage.removeItem('user'); 
  router.push('/'); // Redirect to the home (login) page
};

// Modal visibility state
const showModal = ref(false);

// Function to open the Add New Item modal
const openAddModal = () => {
  showModal.value = true;
};

// Function to close the modal
const closeModal = () => {
  showModal.value = false;
};

// Function to handle adding a new item
const addItem = (newItem) => {
  emit('addItem', newItem); // Emit event to parent to add item
  closeModal(); // Close the modal after adding
};
</script>

<template>
  <div class="container mx-auto p-6 w-full h-screen ">
    <h1 class="text-3xl font-bold text-center mb-4">Dashboard</h1>
    <p class="text-center text-lg mb-6">Welcome, Lortech!</p>

    <button
      @click="openAddModal"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add New Item
    </button>

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
        <form @submit.prevent="addItem({ name: itemName, description: itemDescription, price: itemPrice, quantity: itemQuantity })">
          <input v-model="itemName" placeholder="Item Name" class="border p-2 w-full mb-4" required />
          <input v-model="itemDescription" placeholder="Description" class="border p-2 w-full mb-4" required />
          <input v-model="itemPrice" type="number" placeholder="Price" class="border p-2 w-full mb-4" required />
          <input v-model="itemQuantity" type="number" placeholder="Quantity" class="border p-2 w-full mb-4" required />
          <div class="flex justify-between">
            <button type="button" @click="closeModal" class="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Add Item</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

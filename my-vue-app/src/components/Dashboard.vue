<script setup>
import { ref, onMounted } from 'vue';
import InventoryTable from './InventoryTable.vue';
import DeleteConfirmationModal from './DeleteConfirmationModal.vue';
import { useRouter } from 'vue-router';
import { useInventoryStore } from '../stores/inventoryStore'; // Adjust the path as necessary

// Use the inventory store
const inventoryStore = useInventoryStore();

const showModal = ref(false);
const showDeleteModal = ref(false);

// Reactive variables for new item data
const itemName = ref('');
const itemDescription = ref('');
const itemPrice = ref(0);
const itemQuantity = ref(0);

// Function to open the Add New Item modal
const openAddModal = () => {
  showModal.value = true;
  // Reset item data when opening the modal
  itemName.value = '';
  itemDescription.value = '';
  itemPrice.value = 0;
  itemQuantity.value = 0;
};

// Function to close the modal
const closeModal = () => {
  showModal.value = false;
};

// Function to handle adding a new item
const addItem = () => {
  const newItem = {
    name: itemName.value,
    description: itemDescription.value,
    price: itemPrice.value,
    quantity: itemQuantity.value,
  };
  inventoryStore.addItem(newItem); // Add the new item to the store
  closeModal(); // Close the modal after adding
};

// Open modal to edit an existing item
const openEditModal = (item) => {
  inventoryStore.selectedItem = item;
  // Open your edit modal logic here if you have one
};

// Open delete confirmation modal
const openDeleteModal = (item) => {
  inventoryStore.selectedItem = item;
  showDeleteModal.value = true;
};

// Close delete modal
const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

// Delete an item
const deleteItem = async () => {
  await inventoryStore.deleteItem(inventoryStore.selectedItem.id);
  closeDeleteModal();
};

// Logout function
const router = useRouter();
const logout = () => {
  localStorage.removeItem('user'); // Clear user data if necessary
  router.push('/'); // Redirect to the home (login) page
};

// Fetch the inventory items when component mounts
onMounted(() => {
  inventoryStore.fetchItems();
});
</script>

<template>
  <div class="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Inventory Dashboard</h1>
      <button @click="logout" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600">
        Logout
      </button>
    </div>

    <!-- Button to open the add item modal -->
    <button
      @click="openAddModal"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
    >
      Add New Item
    </button>

    <!-- Inventory Table to display current items -->
    <InventoryTable
      :items="inventoryStore.items"
      @editItem="openEditModal"
      @deleteItem="openDeleteModal"
    />

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

    <!-- Delete confirmation modal -->
    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :item="inventoryStore.selectedItem"
      @close="closeDeleteModal"
      @confirmDelete="deleteItem"
    />
  </div>
</template>



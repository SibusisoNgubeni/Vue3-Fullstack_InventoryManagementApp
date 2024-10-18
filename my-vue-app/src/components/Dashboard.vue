<script setup>
import { ref, onMounted } from 'vue';
import InventoryTable from './InventoryTable.vue';
import AddEditItemModal from './AddEditItemModal.vue';
import DeleteConfirmationModal from './DeleteConfirmationModal.vue';
import { useRouter } from 'vue-router';
import { useInventoryStore } from '../stores/inventoryStore'; // Adjust the path as necessary

// Use the inventory store
const inventoryStore = useInventoryStore();

const showAddEditModal = ref(false);
const showDeleteModal = ref(false);

// Open modal to add a new item
const openAddModal = () => {
  inventoryStore.selectedItem = null; // Reset selected item for new item
  showAddEditModal.value = true;
};

// Open modal to edit an existing item
const openEditModal = (item) => {
  inventoryStore.selectedItem = item;
  showAddEditModal.value = true;
};

// Open delete confirmation modal
const openDeleteModal = (item) => {
  inventoryStore.selectedItem = item;
  showDeleteModal.value = true;
};

// Close add/edit modal and refresh items
const closeAddEditModal = () => {
  showAddEditModal.value = false;
  inventoryStore.fetchItems(); // Fetch updated items
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
    </div>

    <!-- Flex container for buttons -->
    <div class="flex justify-end items-center mb-4 space-x-4">
      <button @click="logout" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600">
        Logout
      </button>
    </div>

    <!-- Inventory Table to display current items -->
    <InventoryTable
      :items="inventoryStore.items"
      @editItem="openEditModal"
      @deleteItem="openDeleteModal"
      class="w-full table-auto border-collapse"
    />

    <!-- Modals for Adding/Editing and Deleting items -->
    <AddEditItemModal
      v-if="showAddEditModal"
      :item="inventoryStore.selectedItem"
      @close="closeAddEditModal"
      @save="inventoryStore.fetchItems"
    />
    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :item="inventoryStore.selectedItem"
      @close="closeDeleteModal"
      @confirmDelete="deleteItem"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';


const props = defineProps({
  item: Object,
});


const emit = defineEmits(['confirmDelete', 'close']);

// Function to emit confirmDelete event
const confirmDelete = () => {
  emit('confirmDelete');
};

// Function to emit close event
const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
      <h2 class="text-lg font-semibold text-center mb-4">Are you sure you want to delete "{{ item.name }}"?</h2>
      <div class="flex justify-between mt-6">
        <button 
          @click="confirmDelete" 
          class="flex-1 bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-700 transition duration-200 mr-2"
        >
          Yes, Delete
        </button>
        <button 
          @click="closeModal" 
          class="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded-md hover:bg-gray-400 transition duration-200 ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
</style>

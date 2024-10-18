<script setup>
import { ref, watch, defineEmits, defineProps, onMounted } from 'vue';

const props = defineProps({
  item: Object,
});

const emit = defineEmits(['save', 'close']);

// State for the form data
const form = ref({
  name: '',
  description: '',
  price: '',
  quantity: 0,
});

// Function to initialize form with item data
const initializeForm = () => {
  if (props.item) {
    form.value.name = props.item.name;
    form.value.description = props.item.description;
    form.value.price = props.item.price;
    form.value.quantity = props.item.quantity || 0;
  } else {
    form.value = {
      name: '',
      description: '',
      price: '',
      quantity: 0,
    };
  }
};

// Watch for changes in the item prop
watch(() => props.item, (newItem) => {
  initializeForm();
});

// Initialize the form on mount
onMounted(() => {
  initializeForm();
});

// Function to save the item
const saveItem = async () => {
  try {
    const method = props.item ? 'PUT' : 'POST';
    const url = props.item
      ? `http://localhost:3000/api/food-items/${props.item.id}`
      : 'http://localhost:3000/api/food-items';

    console.log('Saving item with data:', {
      ...form.value,
      quantity: Number(form.value.quantity),
    });

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...form.value,
        quantity: Number(form.value.quantity),
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    emit('save');
    emit('close');
  } catch (error) {
    console.error('Error saving item:', error);
  }
};

// Function to close the modal
const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold text-center mb-4">{{ props.item ? 'Edit Item' : 'Add New Item' }}</h2>
      <form @submit.prevent="saveItem" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input 
            v-model="form.name" 
            required 
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            placeholder="Enter item name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <input 
            v-model="form.description" 
            required 
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            placeholder="Enter item description"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Price</label>
          <input 
            v-model="form.price" 
            type="number" 
            required 
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            placeholder="Enter item price"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Quantity</label>
          <input 
            v-model.number="form.quantity" 
            type="number" 
            required 
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            placeholder="Enter item quantity"
          />
        </div>

        <div class="flex justify-between mt-6">
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
          <button 
            type="button" 
            @click="closeModal" 
            class="w-full bg-gray-300 text-gray-700 font-bold py-2 rounded-md hover:bg-gray-400 transition duration-200 ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
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

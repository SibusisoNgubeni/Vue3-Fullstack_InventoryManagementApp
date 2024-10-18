import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref([]);
  const selectedItem = ref(null);

  // Fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/food-items');
      const data = await response.json();
      items.value = data;
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Add a new item
  const addItem = async (newItem) => {
    try {
      const response = await fetch('http://localhost:3000/api/food-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      const item = await response.json();
      items.value.push(item);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Update an existing item
  const updateItem = async (updatedItem) => {
    try {
      await fetch(`http://localhost:3000/api/food-items/${updatedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
      const index = items.value.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        items.value[index] = updatedItem;
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Delete an item
  const deleteItem = async (itemId) => {
    try {
      await fetch(`http://localhost:3000/api/food-items/${itemId}`, {
        method: 'DELETE',
      });
      items.value = items.value.filter(item => item.id !== itemId);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return {
    items,
    selectedItem,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
  };
});

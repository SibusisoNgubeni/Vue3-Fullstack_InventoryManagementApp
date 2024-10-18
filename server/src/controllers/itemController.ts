import { Context } from 'hono';
import { getAllFoodItems, createFoodItem, updateFoodItem, deleteFoodItem } from '../models/foodItemModel';

/**
 * Get all food items.
 * 
 * @param {Context} c - The Hono context object.
 * @returns {Promise<Response>} - A JSON response containing success status and food items or error message.
 */
export const getAllItems = async (c: Context): Promise<Response> => {
    try {
        const items = await getAllFoodItems();
        return c.json({ success: true, data: items });
    } catch (error) {
        console.error('Error fetching items:', error);
        return c.json({ success: false, message: 'Error fetching items' }, 500);
    }
};

/**
 * Add a new food item.
 * 
 * @param {Context} c - The Hono context object.
 * @returns {Promise<Response>} - A JSON response containing success status and the created food item or error message.
 */
export const addItem = async (c: Context): Promise<Response> => {
    const { name, description, price, quantity } = await c.req.json(); // Add quantity here

    if (!name || !description || !price || quantity === undefined) { // Check for quantity
        return c.json({ success: false, message: 'Name, description, price, and quantity are required.' }, 400);
    }

    try {
        const newItem = await createFoodItem(name, description, price, quantity); // Pass quantity
        return c.json({ success: true, data: newItem }, 201);
    } catch (error) {
        console.error('Error adding item:', error);
        return c.json({ success: false, message: 'Error adding item' }, 500);
    }
};


/**
 * Update an existing food item.
 * 
 * @param {Context} c - The Hono context object.
 * @returns {Promise<Response>} - A JSON response containing success status and the updated food item or error message.
 */
export const updateItem = async (c: Context): Promise<Response> => {
    const { id } = c.req.param();
    const { name, description, price, quantity } = await c.req.json(); // Add quantity here

    // Check if at least one field is provided for update
    if (!name && !description && !price && quantity === undefined) {
        return c.json({ success: false, message: 'At least one field (name, description, price, quantity) is required for update.' }, 400);
    }

    try {
        const updatedItem = await updateFoodItem(Number(id), name, description, price, quantity); // Pass quantity
        if (updatedItem) {
            return c.json({ success: true, data: updatedItem });
        } else {
            return c.json({ success: false, message: 'Item not found' }, 404);
        }
    } catch (error) {
        console.error('Error updating item:', error);
        return c.json({ success: false, message: 'Error updating item' }, 500);
    }
};


/**
 * Delete a food item.
 * 
 * @param {Context} c - The Hono context object.
 * @returns {Promise<Response>} - A response indicating success or error message.
 */
export const deleteItem = async (c: Context): Promise<Response> => {
    const { id } = c.req.param();

    try {
        const success = await deleteFoodItem(Number(id));
        if (success) {
            return c.body(null, 204); 
        } else {
            return c.json({ success: false, message: 'Item not found' }, 404);
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        return c.json({ success: false, message: 'Error deleting item' }, 500);
    }
};

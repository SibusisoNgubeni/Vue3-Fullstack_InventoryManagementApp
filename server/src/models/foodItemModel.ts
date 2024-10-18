import { db } from '../db';  
import { foodItems } from '../db/schema';  
import { eq } from 'drizzle-orm/expressions';

/**
 * Represents a food item.
 * @interface FoodItem
 * @property {number} id - The unique identifier for the food item.
 * @property {string} name - The name of the food item.
 * @property {string} description - A brief description of the food item.
 * @property {number} price - The price of the food item.
 */
export interface FoodItem {
    id: number;
    name: string;
    description: string;
    price: number;
}

/**
 * Retrieves all food items from the database.
 * 
 * @async
 * @returns {Promise<FoodItem[]>} A promise that resolves to an array of food items.
 * @throws {Error} If the database query fails.
 */
export const getAllFoodItems = async (): Promise<FoodItem[]> => {
    const items = await db.select({
        id: foodItems.id,
        name: foodItems.name,
        description: foodItems.description,
        price: foodItems.price,
    }).from(foodItems).execute();

    return items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: parseFloat(item.price), 
    }));
};

/**
 * Creates a new food item in the database.
 * 
 * @async
 * @param {string} name - The name of the new food item.
 * @param {string} description - A description of the new food item.
 * @param {number} price - The price of the new food item.
 * @returns {Promise<FoodItem>} A promise that resolves to the created food item.
 * @throws {Error} If the database insert operation fails.
 */
export const createFoodItem = async (name: string, description: string, price: number): Promise<FoodItem> => {
    const [newItem] = await db.insert(foodItems)
        .values({ 
            name, 
            description, 
            price: price.toString()
        })
        .returning({
            id: foodItems.id,
            name: foodItems.name,
            description: foodItems.description,
            price: foodItems.price,
        })
        .execute();
    
    return {
        id: Number(newItem.id), 
        name: String(newItem.name), 
        description: String(newItem.description), 
        price: Number(newItem.price), 
    };
};

/**
 * Updates an existing food item in the database.
 * 
 * @async
 * @param {number} id - The ID of the food item to update.
 * @param {string} name - The new name of the food item.
 * @param {string} description - The new description of the food item.
 * @param {number} price - The new price of the food item.
 * @returns {Promise<FoodItem | null>} A promise that resolves to the updated food item or null if not found.
 * @throws {Error} If the database update operation fails.
 */
export const updateFoodItem = async (id: number, name: string, description: string, price: number): Promise<FoodItem | null> => {
    const [updatedItem] = await db.update(foodItems)
        .set({ 
            name, 
            description, 
            price: price.toString() 
        }) 
        .where(eq(foodItems.id, id))
        .returning({
            id: foodItems.id,
            name: foodItems.name,
            description: foodItems.description,
            price: foodItems.price,
        })
        .execute();
    
    return updatedItem ? {
        id: updatedItem.id,
        name: updatedItem.name,
        description: updatedItem.description,
        price: parseFloat(updatedItem.price), 
    } as FoodItem : null; 
};

/**
 * Deletes a food item from the database.
 * 
 * @async
 * @param {number} id - The ID of the food item to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the item was deleted, false otherwise.
 * @throws {Error} If the database delete operation fails.
 */
export const deleteFoodItem = async (id: number): Promise<boolean> => {
    const result = await db.delete(foodItems)
        .where(eq(foodItems.id, id))
        .returning({
            id: foodItems.id,
            name: foodItems.name,
            description: foodItems.description,
            price: foodItems.price,
        })
        .execute();
    
    return result.length > 0;
};

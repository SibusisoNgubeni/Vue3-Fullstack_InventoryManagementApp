import { Router } from 'express';
import { connectToDatabase } from '../database';

const router = Router();
let db: any;

/**
 * Initialize the database connection.
 * 
 * This function connects to the PostgreSQL database and stores the 
 * database instance for querying food items.
 */
const initDb = async () => {
    db = await connectToDatabase();
};
initDb();

/**
 * Get all food items.
 * 
 * This route handles GET requests to fetch all food items from the 
 * database and returns the food items in JSON format If successful.
 * 
 * @route GET /api/fooditems
 * @returns {Array} An array of food items.
 * @throws {Error} If fetching food items fails, returns an error message.
 */
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM food_items');
        res.json(result.rows); 
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).json({ error: 'Failed to fetch food items' });
    }
});

/**
 * Create a new food item.
 * 
 * This route handles POST requests to add a new food item to the 
 * database. It expects a request body containing the item's name 
 * and quantity. Upon success, it returns the created food item.
 * 
 * @route POST /api/fooditems
 * @param {Object} req.body - The food item data.
 * @param {string} req.body.name - The name of the food item.
 * @param {number} req.body.quantity - The quantity of the food item.
 * @returns {Object} The created food item.
 * @throws {Error} If creating the food item fails, returns an error message.
 */
router.post('/', async (req, res) => {
    const { name, quantity } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO food_items (name, quantity) VALUES ($1, $2) RETURNING *',
            [name, quantity]
        );
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error('Error creating food item:', error);
        res.status(500).json({ error: 'Failed to create food item' });
    }
});

/**
 * Update an existing food item.
 * 
 * This route handles PUT requests to update an existing food item 
 * based on the provided item ID. It expects a request body with 
 * updated name and quantity. Returns the updated food item upon success.
 * 
 * @route PUT /api/fooditems/:id
 * @param {string} req.params.id - The ID of the food item to update.
 * @param {Object} req.body - The updated food item data.
 * @param {string} req.body.name - The updated name of the food item.
 * @param {number} req.body.quantity - The updated quantity of the food item.
 * @returns {Object} The updated food item.
 * @throws {Error} If updating the food item fails or if the item is not found.
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    try {
        const result = await db.query(
            'UPDATE food_items SET name = $1, quantity = $2 WHERE id = $3 RETURNING *',
            [name, quantity, id]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]); 
        } else {
            res.status(404).json({ error: `Food item ${id} not found` });
        }
    } catch (error) {
        console.error('Error updating food item:', error);
        res.status(500).json({ error: 'Failed to update food item' });
    }
});

/**
 * Delete a food item.
 * 
 * This route handles DELETE requests to remove a food item from the 
 * database based on the provided item ID. If successful, it returns 
 * a 204 No Content response.
 * 
 * @route DELETE /api/fooditems/:id
 * @param {string} req.params.id - The ID of the food item to delete.
 * @throws {Error} If deleting the food item fails or if the item is not found.
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM food_items WHERE id = $1', [id]);

        if (result.rowCount > 0) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: `Food item ${id} not found` });
        }
    } catch (error) {
        console.error('Error deleting food item:', error);
        res.status(500).json({ error: 'Failed to delete food item' });
    }
});

export default router;

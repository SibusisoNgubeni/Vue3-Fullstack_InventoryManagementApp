import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './db/index'; 
import { connectToDatabase } from './database';
import { foodItems } from './db/schema'; 
import { eq } from 'drizzle-orm'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

// CREATE - Add a new food item
app.post('/api/food-items', async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    if (!name || !description || !price || quantity === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const [newItem] = await db
      .insert(foodItems)
      .values({
        name,
        description,
        price,
        quantity,
      })
      .returning();

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding food item:', error);  // Log the actual error message
    res.status(500).json({ error: 'Failed to add food item' });
  }
});


// READ - Fetch all food items
app.get('/api/food-items', async (req, res) => {
  try {
    const items = await db.select().from(foodItems);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

// READ - Fetch a specific food item by ID`
app.get('/api/food-items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [item] = await db
      .select()
      .from(foodItems)
      .where(eq(foodItems.id, Number(id)));

    if (!item) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food item' });
  }
});

// UPDATE - Update a specific food item by ID
app.put('/api/food-items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const updatedItems = await db
      .update(foodItems)
      .set({
        name,
        description,
        price,
      })
      .where(eq(foodItems.id, Number(id)))
      .returning();

    if (!updatedItems.length) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.json(updatedItems[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update food item' });
  }
});

// DELETE - Remove a specific food item by ID
app.delete('/api/food-items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItems = await db
      .delete(foodItems)
      .where(eq(foodItems.id, Number(id)))
      .returning();

    if (!deletedItems.length) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.json({ message: 'Food item deleted successfully', item: deletedItems[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food item' });
  }
});

app.get('/api/test-db', async (req, res) => {
  try {
    // Test a simple query
    const result = await db.select().from(foodItems).limit(1);
    if (result.length) {
      return res.status(200).json({ message: 'Database connection successful', result });
    } else {
      return res.status(500).json({ message: 'Database is connected but no data found' });
    }
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Failed to connect to the database' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

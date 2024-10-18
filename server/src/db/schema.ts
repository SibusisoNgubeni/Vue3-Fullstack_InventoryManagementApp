import { pgTable, serial, text, integer, decimal, timestamp } from 'drizzle-orm/pg-core';

/**
 * Table schema for the food_items table in the database.
 * 
 * @constant {import('drizzle-orm/pg-core').PgTable} foodItems - The Drizzle ORM table definition for food_items.
 */
export const foodItems = pgTable('food_items', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    price: decimal('price').notNull(),
    quantity: integer('quantity').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
});

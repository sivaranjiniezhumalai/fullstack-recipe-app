import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const favoritesTable = pgTable("favorites", {
  id: serial("id").primaryKey(), // Keep a unique primary key
  userId: text("user_id").notNull(), // foreign key (or just text)
  recipeId: integer("recipe_id").notNull(),
  recipeName: text("recipe_name").notNull(),
  image: text("image"),
  cookTime: integer("cook_time"),
  servings: integer("servings"),
  createdAt: timestamp("created_at").defaultNow(),
});

import express from "express";
import "dotenv/config";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { eq, and } from "drizzle-orm";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ pretty: true });
});

app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeId, recipeName, image, cookTime, servings } =
      req.body;

    if (!userId || !recipeId || !recipeName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFav = await db
      .insert(favoritesTable)
      .values({ userId, recipeId, recipeName, image, cookTime, servings })
      .returning();

    res.status(201).json(newFav[0]);
  } catch (error) {
    console.log("Error adding favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, userId),
          eq(favoritesTable.recipeId, recipeId)
        )
      );

    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    console.log("Error deleting favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const newFav = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));

    res.status(200).json(newFav);
  } catch (error) {
    console.log("Error fetching favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log("server is runnig on port", PORT);
});

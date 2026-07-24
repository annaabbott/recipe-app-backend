import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./models/recipe.js";

// const mongoURI = "mongodb://localhost:27017/recipeDB";
// mongoose.set("strictQuery", true);
// mongoose.connect(mongoURI);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/recipes", async (req, res) => {
  console.log("Fetching all recipes...");
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/recipes/:id", async (req, res) => {
  console.log(`Fetching recipe with id: ${req.params.id}`);
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Malformed id" });
  }

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/recipes", async (req, res) => {
  const body = req.body;
  if (!body.name || !body.ingredients) {
    return res.status(400).json({ error: "Name and ingredients are required" });
  }

  const newRecipe = {
    name: body.name,
    ingredients: body.ingredients,
    favorite: body.favorite || false,
  };

  try {
    const recipe = new Recipe(newRecipe);
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/recipes/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Malformed id" });
  }

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/recipes/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Malformed id" });
  }

  const body = req.body;
  if (!body.name || !body.ingredients) {
    return res.status(400).json({ error: "Name and ingredients are required" });
  }

  try {
    const updated = await Recipe.findByIdAndUpdate(
      id,
      {
        name: body.name,
        ingredients: body.ingredients,
        favorite: body.favorite ?? false,
      },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Recipe app backend is starting on port ${port}...`);
});

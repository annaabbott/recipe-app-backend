import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./models/recipe.js";

// const mongoURI = "mongodb://localhost:27017/recipeDB";
// mongoose.set("strictQuery", true);
// mongoose.connect(mongoURI);

const app = express();
const port = process.env.PORT || 3000;

let recipes = [
  {
    id: 1,
    name: "Pasta",
    ingredients: ["pasta", "sauce", "cheese"],
    favorite: false,
  },
  {
    id: 2,
    name: "Salad",
    ingredients: ["lettuce", "tomato", "cucumber"],
    favorite: true,
  },
  {
    id: 3,
    name: "Soup",
    ingredients: ["broth", "vegetables", "herbs"],
    favorite: false,
  },
];

// const recipeSchema = new mongoose.Schema({
//   id: { type: Number },
//   name: { type: String, required: true },
//   ingredients: { type: [String], required: true },
//   favorite: { type: Boolean },
// });

// const Recipe = mongoose.model("Recipe", recipeSchema);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/recipes", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/api/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Recipe.findById(id)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.json(recipe);
    })
    .catch((error) => {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/api/recipes", (req, res) => {
  const { name, ingredients, favorite } = req.body;
  const newRecipe = {
    id: recipes.length + 1,
    name,
    ingredients,
    favorite: favorite || false,
  };
  if (!name || !ingredients) {
    return res.status(400).json({ error: "Name and ingredients are required" });
  }
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

app.delete("/api/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const recipeIndex = recipes.findIndex((r) => r.id === id);
  if (recipeIndex === -1) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  recipes.splice(recipeIndex, 1);
  res.json({ message: "Recipe deleted" });
});

app.listen(port, () => {
  console.log(`Recipe app backend is running on port ${port}`);
});

import express from "express";

const app = express();
const port = 3000;

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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

app.get("/api/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  res.json(recipe);
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

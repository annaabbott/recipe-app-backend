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

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

app.listen(port, () => {
  console.log(`Recipe app backend is running on port ${port}`);
});

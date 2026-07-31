// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Recipe from "./models/recipe.js";
// import errorHandler from "./middleware/errorHandler.js";

// dotenv.config();

// const mongoURI = "mongodb://localhost:27017/recipeDB";
// mongoose.set("strictQuery", true);
// mongoose.connect(mongoURI);

// const app = express();
// const port = config.PORT || 3000;

// app.use(express.json());

// app.get("/api/recipes", async (req, res, next) => {
//   console.log("Fetching all recipes...");
//   try {
//     const recipes = await Recipe.find({});
//     res.json(recipes);
//   } catch (error) {
//     next(error);
//   }
// });

// app.get("/api/recipes/:id", async (req, res, next) => {
//   console.log(`Fetching recipe with id: ${req.params.id}`);
//   const id = req.params.id;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Malformed id" });
//   }

//   try {
//     const recipe = await Recipe.findById(id);
//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found" });
//     }
//     res.json(recipe);
//   } catch (error) {
//     next(error);
//   }
// });

// app.post("/api/recipes", async (req, res, next) => {
//   const body = req.body;
//   if (!body.name || !body.ingredients) {
//     return res.status(400).json({ error: "Name and ingredients are required" });
//   }

//   const newRecipe = {
//     name: body.name,
//     ingredients: body.ingredients,
//     favorite: body.favorite || false,
//   };

//   try {
//     const recipe = new Recipe(newRecipe);
//     const savedRecipe = await recipe.save();
//     res.status(201).json(savedRecipe);
//   } catch (error) {
//     next(error);
//   }
// });

// app.delete("/api/recipes/:id", async (req, res, next) => {
//   const id = req.params.id;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Malformed id" });
//   }

//   try {
//     const deletedRecipe = await Recipe.findByIdAndDelete(id);
//     if (!deletedRecipe) {
//       return res.status(404).json({ error: "Recipe not found" });
//     }
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// });

// app.put("/api/recipes/:id", async (req, res, next) => {
//   const id = req.params.id;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Malformed id" });
//   }

//   const body = req.body;
//   if (!body.name || !body.ingredients) {
//     return res.status(400).json({ error: "Name and ingredients are required" });
//   }

//   try {
//     const updated = await Recipe.findByIdAndUpdate(
//       id,
//       {
//         name: body.name,
//         ingredients: body.ingredients,
//         favorite: body.favorite ?? false,
//       },
//       { new: true, runValidators: true },
//     );

//     if (!updated) {
//       return res.status(404).json({ error: "Recipe not found" });
//     }

//     res.json(updated);
//   } catch (error) {
//     next(error);
//   }
// });

// app.use(errorHandler);
import app from "./app.js";
import config from "./utils/config.js";
import logger from "./utils/logger.js";

app.listen(config.PORT, () => {
  logger.info(`Recipe app backend is starting on port ${config.PORT}...`);
});

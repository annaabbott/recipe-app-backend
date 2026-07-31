import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  favorite: { type: Boolean, default: false },
});

recipeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
const recipeRouter = express.Router();

recipeRouter.get("/", async (req, res, next) => {
  console.log("Fetching all recipes...");
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (error) {
    next(error);
  }
});

recipeRouter.get("/:id", async (req, res, next) => {
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
    next(error);
  }
});

recipeRouter.post("/", async (req, res, next) => {
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
    next(error);
  }
});

recipeRouter.delete("/:id", async (req, res, next) => {
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
    next(error);
  }
});

recipeRouter.put("/:id", async (req, res, next) => {
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
    next(error);
  }
});

// const url = process.env.MONGODB_URI || "mongodb://localhost:27017/recipeDB";
// console.log("Connecting to", url);

// mongoose
//   .connect(url, { family: 4 })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error.message);
//   });

// const recipeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   ingredients: { type: [String], required: true },
//   favorite: { type: Boolean },
// });

// recipeSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

// export default mongoose.model("Recipe", recipeSchema);

export default recipeRouter;

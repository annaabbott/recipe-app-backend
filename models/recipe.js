import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/recipeDB";
console.log("Connecting to", url);

mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  favorite: { type: Boolean },
});

recipeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Recipe", recipeSchema);

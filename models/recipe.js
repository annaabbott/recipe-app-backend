import "mongoose";

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/recipeDB";

mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const recipeSchema = new mongoose.Schema({
  id: { type: Number },
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

module.exports = mongoose.model("Recipe", recipeSchema);

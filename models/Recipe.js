import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    enum: ["Muscle Gain", "Fat Loss", "Maintenance", "Performance"],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
  prepTime: {
    type: String, 
  },
  
 
  macros: {
    calories: { type: Number, required: true },
    protein: { type: Number, required: true }, // in grams
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
  },

  ingredients: [
    {
      item: String,
      amount: String
    }
  ],


}, { timestamps: true });

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);

export default Recipe;
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    recipeType: [
      {
        type: String,
        enum: ["Italian", "Indian", "Asian", "Chinese"],
      },
    ],
    ingredients: [
      {
        type: String,
      },
    ],
    instructions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Recipe1 = mongoose.model("Recipe1", recipeSchema);

module.exports = Recipe1;

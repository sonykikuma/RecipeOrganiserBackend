require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,

  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const { initializeDatabase } = require("./db");
// const fs = require("fs");
const Recipe1 = require("./models/recipe.models");

app.use(express.json());
initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// const jsonData = fs.readFileSync("recipe.json", "utf8");
// const recipesData = JSON.parse(jsonData);
// function seedData() {
//   try {
//     for (const recipeData of recipesData) {
//       const newRecipe = new Recipe1({
//         title: recipeData.title,
//         image: recipeData.image,
//         recipeType: recipeData.recipeType,
//         ingredients: recipeData.ingredients,
//         instructions: recipeData.instructions,
//       });
//       newRecipe.save();
//       console.log("new recipe", newRecipe.title);
//     }
//   } catch (error) {
//     console.log("error seeding the data", error);
//   }
// }

// seedData();

//get all recipes
app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await Recipe1.find();
    res.json(allRecipes);
    // console.log(allRecipes);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

//add a recipe
app.post("/recipes", async (req, res) => {
  const { title, image, recipeType, ingredients, instructions } = req.body;

  try {
    const newRecipe = new Recipe1({
      title,
      image,
      recipeType,
      ingredients,
      instructions,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

//delete a recipe
app.delete("/recipes/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    const deleteRecipe = await Recipe1.findByIdAndDelete(recipeId);
    if (!deleteRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res
      .status(200)
      .json({ message: "Recipe deleted successfully", recipe: deleteRecipe });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//get recipe by title
app.get("/recipes/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const recipeByTitle = await Recipe1.find({ title: title });

    if (recipeByTitle) {
      res.json(recipeByTitle);
    } else {
      res.status(400).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

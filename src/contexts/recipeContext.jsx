import { createContext } from "react";

export const RecipeContext = createContext({
  recipeId: null,
  title: "",
  description: "",
  image: "",
  ingredients: [],
  steps: [],
  setRecipeId: () => {},
  setTitle: () => {},
  setDescription: () => {},
  setImage: () => {},
  setIngredients: () => {},
  setSteps: () => {},
});

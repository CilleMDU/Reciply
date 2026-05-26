import { createContext } from "react";

export const RecipeContext = createContext({
  recipeId: null,
  title: "",
  description: "",
  ingredients: [],
  steps: [],
  setRecipeId: () => {},
  setTitle: () => {},
  setDescription: () => {},
  setIngredients: () => {},
  setSteps: () => {},
});

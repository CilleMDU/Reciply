import { createContext } from "react";

export const RecipeContext = createContext({
  recipeId: null,
  title: "",
  description: "",
  setTitle: () => {},
  setDescription: () => {},
});
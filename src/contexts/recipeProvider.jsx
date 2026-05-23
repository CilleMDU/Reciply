import {useState} from "react";
import { RecipeContext } from "./recipeContext";

export default function RecipeProvider({ children }) {
  const [recipeId, setRecipeId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <RecipeContext.Provider
      value={{ recipeId, setRecipeId, title, setTitle, description, setDescription }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
import { useState } from "react";
import { RecipeContext } from "./recipeContext";

export default function RecipeProvider({ children }) {
  const [recipeId, setRecipeId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  return (
    <RecipeContext.Provider
      value={{
        recipeId,
        setRecipeId,
        title,
        setTitle,
        description,
        setDescription,
        image,
        setImage,
        ingredients,
        setIngredients,
        steps,
        setSteps,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

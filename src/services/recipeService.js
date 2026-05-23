const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_APIKEY;

const headers = {
  "Content-Type": "application/json",
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
};

export const recipeService = {
  async createRecipeMain(recipeData) {
    const { title, description, picture } = recipeData;
    try {
      const response = await fetch(`${URL}/rest/v1/recipe_main`, {
        method: "POST",
        headers,
        body: JSON.stringify({ title, description, picture }),
      });
      if (!response.ok) {
        throw new Error("Failed to create recipe main");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating recipe main:", error);
      throw error;
    }
  },

  async uploadRecipeImage(file) {
    if (!file) {
      throw new Error("No file provided for upload");
    }

    const fileName = `${Date.now()}_${file.name}`;

    try {
      const response = await fetch(
        `${URL}storage/v1/object/recipes_name/${fileName}`,
        {
          method: "POST",
          headers: {
            apikey: KEY,
            Authorization: `Bearer ${KEY}`,
          },
          body: file,
        },
      );
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      return `${URL}storage/v1/object/public/recipes_name/${fileName}`;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  async updateRecipeMain(recipeId, recipeData) {
    const { title, description, picture } = recipeData;
    try {
      const response = await fetch(
        `${URL}/rest/v1/recipe_main?id=eq.${recipeId}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ title, description, picture }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to update recipe main");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating recipe main:", error);
      throw error;
    }
  },

  async fetchRecipeById(recipeId) {
    try {
      const recipeRes = await fetch(
        `${URL}/rest/v1/recipe_main?id=eq.${recipeId}`,
        { method: "GET", headers },
      );
      if (!recipeRes.ok) throw new Error("Failed to fetch recipe");
      const recipe = await recipeRes.json();

      const ingredientsRes = await fetch(
        `${URL}/rest/v1/ingrediens?recipe_id=eq.${recipeId}`,
        { method: "GET", headers },
      );
      const ingredients = ingredientsRes.ok ? await ingredientsRes.json() : [];

      const stepsRes = await fetch(
        `${URL}/rest/v1/steps?recipe_id=eq.${recipeId}`,
        { method: "GET", headers },
      );
      const steps = stepsRes.ok ? await stepsRes.json() : [];

      const categoriesRes = await fetch(
        `${URL}/rest/v1/recipe_categories?recipe_id=eq.${recipeId}`,
        { method: "GET", headers },
      );
      const categories = categoriesRes.ok ? await categoriesRes.json() : [];

      return { ...recipe[0], ingredients, steps, categories };
    } catch (error) {
      console.error("Error fetching recipe:", error);
      throw error;
    }
  },

  async fetchAllRecipes() {
    try {
      const response = await fetch(`${URL}/rest/v1/recipe_main`, {
        method: "GET",
        headers,
      });
      if (!response.ok) throw new Error("Failed to fetch recipes");
      return await response.json();
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  },

  async createIngredient(recipeId, ingredientData) {
    try {
      const response = await fetch(`${URL}/rest/v1/ingrediens`, {
        method: "POST",
        headers,
        body: JSON.stringify({ recipe_id: recipeId, ...ingredientData }),
      });
      if (!response.ok) throw new Error("Failed to create ingredient");
      return await response.json();
    } catch (error) {
      console.error("Error creating ingredient:", error);
      throw error;
    }
  },

  async updateIngredient(ingredientId, ingredientData) {
    try {
      const response = await fetch(`${URL}/rest/v1/ingrediens?id=eq.${ingredientId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(ingredientData),
      });
      if (!response.ok) throw new Error("Failed to update ingredient");
      return await response.json();
    } catch (error) {
      console.error("Error updating ingredient:", error);
      throw error;
    }
  },

  async deleteIngredient(ingredientId) {
    try {
      const response = await fetch(
        `${URL}/rest/v1/ingrediens?id=eq.${ingredientId}`,
        { method: "DELETE", headers },
      );
      if (!response.ok) throw new Error("Failed to delete ingredient");
      return await response.json();
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      throw error;
    }
  },

  async createStep(recipeId, stepData) {
    try {
      const response = await fetch(`${URL}/rest/v1/steps`, {
        method: "POST",
        headers,
        body: JSON.stringify({ recipe_id: recipeId, ...stepData }),
      });
      if (!response.ok) throw new Error("Failed to create step");
      return await response.json();
    } catch (error) {
      console.error("Error creating step:", error);
      throw error;
    }
  },

  async updateStep(stepId, stepData) {
    try {
      const response = await fetch(`${URL}/rest/v1/steps?id=eq.${stepId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(stepData),
      });
      if (!response.ok) throw new Error("Failed to update step");
      return await response.json();
    } catch (error) {
      console.error("Error updating step:", error);
      throw error;
    }
  },

  async deleteStep(stepId) {
    try {
      const response = await fetch(`${URL}/rest/v1/steps?id=eq.${stepId}`, {
        method: "DELETE",
        headers,
      });
      if (!response.ok) throw new Error("Failed to delete step");
      return await response.json();
    } catch (error) {
      console.error("Error deleting step:", error);
      throw error;
    }
  },

  async addRecipeCategory(recipeId, categoryId) {
    try {
      const response = await fetch(`${URL}/rest/v1/recipe_categories`, {
        method: "POST",
        headers,
        body: JSON.stringify({ recipe_id: recipeId, category_id: categoryId }),
      });
      if (!response.ok) throw new Error("Failed to add recipe category");
      return await response.json();
    } catch (error) {
      console.error("Error adding recipe category:", error);
      throw error;
    }
  },

  async removeRecipeCategory(recipeId, categoryId) {
    try {
      const response = await fetch(
        `${URL}/rest/v1/recipe_categories?recipe_id=eq.${recipeId}&category_id=eq.${categoryId}`,
        { method: "DELETE", headers },
      );
      if (!response.ok) throw new Error("Failed to remove recipe category");
      return await response.json();
    } catch (error) {
      console.error("Error removing recipe category:", error);
      throw error;
    }
  },
};

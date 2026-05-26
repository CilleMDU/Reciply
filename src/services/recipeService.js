import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_APIKEY,
);

export const recipeService = {
  async createRecipeMain(recipeData) {
    const { title, description, picture } = recipeData;
    try {
      const { data, error } = await supabase
        .from("recipes_main")
        .insert([{ title, information: description, img: picture }])
        .select();

      if (error) throw error;
      return data;
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
      const { error } = await supabase.storage
        .from("user-images")
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("user-images")
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  async updateRecipeMain(recipeId, recipeData) {
    const { title, description, picture } = recipeData;
    try {
      const { data, error } = await supabase
        .from("recipes_main")
        .update({ title, information: description, img: picture })
        .eq("id", recipeId)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating recipe main:", error);
      throw error;
    }
  },

  async fetchRecipeById(recipeId) {
    try {
      const { data: recipe, error: recipeError } = await supabase
        .from("recipes_main")
        .select("*")
        .eq("id", recipeId)
        .single();

      if (recipeError) throw recipeError;

      const { data: ingredients, error: ingredientsError } = await supabase
        .from("ingrediens")
        .select("*")
        .eq("recipe_id", recipeId);

      if (ingredientsError) throw ingredientsError;

      const { data: steps, error: stepsError } = await supabase
        .from("steps")
        .select("*")
        .eq("recipe_id", recipeId)
        .order("step_number", { ascending: true });

      if (stepsError) throw stepsError;

      const { data: categories, error: categoriesError } = await supabase
        .from("recipe_categories")
        .select("*")
        .eq("recipe_id", recipeId);

      if (categoriesError) throw categoriesError;

      return {
        ...recipe,
        ingredients: ingredients || [],
        steps: steps || [],
        categories: categories || [],
      };
    } catch (error) {
      console.error("Error fetching recipe:", error);
      throw error;
    }
  },

  async fetchAllRecipes() {
    try {
      const { data, error } = await supabase.from("recipes_main").select("*");

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  },

  async createIngredient(recipeId, ingredientData) {
    try {
      const { data, error } = await supabase
        .from("ingrediens")
        .insert([{ recipe_id: recipeId, ...ingredientData }])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating ingredient:", error);
      throw error;
    }
  },

  async updateIngredient(ingredientId, ingredientData) {
    try {
      const { data, error } = await supabase
        .from("ingrediens")
        .update(ingredientData)
        .eq("id", ingredientId)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating ingredient:", error);
      throw error;
    }
  },

  async deleteIngredient(ingredientId) {
    try {
      const { error } = await supabase
        .from("ingrediens")
        .delete()
        .eq("id", ingredientId);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      throw error;
    }
  },

  async createStep(recipeId, stepData) {
    try {
      const { data, error } = await supabase
        .from("steps")
        .insert([
          {
            recipe_id: recipeId,
            instruction: stepData.description,
            step_number: stepData.step_number,
          },
        ])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating step:", error);
      throw error;
    }
  },

  async updateStep(stepId, stepData) {
    try {
      const { data, error } = await supabase
        .from("steps")
        .update({ instruction: stepData.description })
        .eq("id", stepId)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating step:", error);
      throw error;
    }
  },

  async deleteStep(stepId) {
    try {
      const { error } = await supabase.from("steps").delete().eq("id", stepId);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting step:", error);
      throw error;
    }
  },

  async addRecipeCategory(recipeId, categoryId) {
    try {
      const { data, error } = await supabase
        .from("recipe_categories")
        .insert([{ recipe_id: recipeId, category_id: categoryId }])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error adding recipe category:", error);
      throw error;
    }
  },

  async removeRecipeCategory(recipeId, categoryId) {
    try {
      const { error } = await supabase
        .from("recipe_categories")
        .delete()
        .eq("recipe_id", recipeId)
        .eq("category_id", categoryId);

      if (error) throw error;
    } catch (error) {
      console.error("Error removing recipe category:", error);
      throw error;
    }
  },

  async addRecipeFilter(recipeId, filterId) {
    try {
      const { data, error } = await supabase
        .from("recipe_categories")
        .insert([{ recipe_id: recipeId, filter_id: filterId }])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error adding recipe filter:", error);
      throw error;
    }
  },

  async removeRecipeFilter(recipeId, filterId) {
    try {
      const { error } = await supabase
        .from("recipe_categories")
        .delete()
        .eq("recipe_id", recipeId)
        .eq("filter_id", filterId);

      if (error) throw error;
    } catch (error) {
      console.error("Error removing recipe filter:", error);
      throw error;
    }
  },
};

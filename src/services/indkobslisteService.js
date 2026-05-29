import { createClient } from "@supabase/supabase-js";
import { recipeService } from "./recipeService";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_APIKEY,
);

export const indkobslisteService = {

      async createIndkobsliste(title) {
        try {
            const { data, error } = await supabase
                .from("indkobslister")
                .insert([{ title }])
                .select();


      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating recipe main:", error);
      throw error;
    }
  },

    async fetchIndkobslisteById(id) {
        let recipeIngredienser = []
        let itemIngredienser = []
        try {
            const {data : indkobsliste} = await supabase
                .from("indkobslister")
                .select("*")
                .eq("id", id)
                .single();
            
            
            const recipeData = await recipeService.fetchRecipeById(indkobsliste.recipe_id)
             
            recipeIngredienser = recipeData.ingredients
            
            //console.log(data)
        }
        catch {
            
        }

        try {
            const { data: data } = await supabase
                .from("indkobslisteItems")
                .select("*")
                .eq("indkobsliste_id", id)
            
            const ingredientsIds = data.map(row => row.ingredients_id);

            const { data: ingrediensData } = await supabase
                .from("ingrediens")
                .select("*")
                .in("id", ingredientsIds)
            
            itemIngredienser = ingrediensData
            
        } catch (error) {
            
        }

        return [...recipeIngredienser , ...itemIngredienser]
    }

};

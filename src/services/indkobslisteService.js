import { createClient } from "@supabase/supabase-js";
import { recipeService } from "./recipeService";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_APIKEY,
);

export const indkobslisteService = {

      async createIndkobsliste(title , listOfItems) {
        try {
            const { data, error } = await supabase
                .from("indkobslister")
                .insert([{ title }])
                .select();
            
            const insertData = listOfItems.map((mitTempObjekt) => ({
                name: mitTempObjekt.name,
                amount: mitTempObjekt.amount,
                indkobsliste_id: data[0].id,
                checked : false
            }))

            console.log(insertData)
        
            const { data: creationResponse , error:indkobsError} = await supabase
                .from("indkobslisteItems")
                .insert(insertData);
            
            if (indkobsError) {
                console.error("Insert error:", indkobsError);
            }


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
            let recipeData = null;
            const { data: indkobsliste } = await supabase
                .from("indkobslister")
                .select("*")
                .eq("id", id)
                .single();
            
            if (indkobsliste.recipe_id) {
                console.log("here")
                recipeData = await recipeService.fetchRecipeById(indkobsliste.recipe_id)
            }
             console.log(recipeData)
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
            
            console.log(data)
            
            const ingredientsIds = data
            .filter(row => row.ingredients_id != null)
                .map(row => row.ingredients_id);
            
            const noIngrediensItems = data
            .filter(row => row.ingredients_id == null)
            .map(row => row);

            const { data: ingrediensData } = await supabase
                .from("ingrediens")
                .select("*")
                .in("id", ingredientsIds)
            
            itemIngredienser = [...ingrediensData , ...noIngrediensItems]
            
        } catch (error) {
            
        }
        

        return [...recipeIngredienser , ...itemIngredienser]
    }

};

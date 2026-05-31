import { createClient } from "@supabase/supabase-js";
import { recipeService } from "./recipeService";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_APIKEY,
);

export const indkobslisteService = {

    async createIndkobsliste(title, listOfItems, recipe_id) {

        try {
            const { data, error } = await supabase
                .from("indkobslister")
                .insert([{ title , recipe_id}])
                .select();
            
            const insertData = listOfItems.map((mitTempObjekt) => ({
                name: mitTempObjekt.name,
                amount: mitTempObjekt.amount,
                ingredients_id:mitTempObjekt.ingredients_id,
                indkobsliste_id: data[0].id,
                checked: false,
                ...(mitTempObjekt.recipe_id && {
                    recipe_id: mitTempObjekt.recipe_id
                })
            }));
        
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
        let indkobsListeData = null;
        try {
            const { data: indkobsListe, error } = await supabase
                .from("indkobslister")
                .select("*")
                .eq("id", id)
            
            indkobsListeData = indkobsListe
        } catch (error) {
            console.log(error)
        }

        try {
            const { data: data } = await supabase
                .from("indkobslisteItems")
                .select("*")
                .eq("indkobsliste_id", id)
            
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
      
            
            const ingredientMap = new Map(
            ingrediensData.map(i => [i.id, i])
            );
            const allItemData = data.map(item => {
            const ingredient = ingredientMap.get(item.ingredients_id);

            if (!ingredient) return item;

                return {
                    ...item,
                    name: ingredient.name,
                    amount: ingredient.amount,
                };
            });

            return {indkobsListeData : indkobsListeData , itemData : allItemData}
            
            
        } catch (error) {
            console.log(error)
        }
    },


    async fetchAllIndkobsLists() {
        let recipeIngredienser = []
        let itemIngredienser = []
        try {
            let recipeData = null;
            const { data: indkobslister , error} = await supabase
                .from("indkobslister")
                .select("*")
            
            return indkobslister
        }
        catch(error) {
            console.log(error)
        }
    },

    async updateIndkobsItem(item) {
        const checked = item.checked
        try {
            const { data, error } = await supabase
                .from("indkobslisteItems")
                .update({checked})
                .eq("id", item.id)
                .select();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

};

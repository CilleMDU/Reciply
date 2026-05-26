import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_APIKEY,
);

export const filterService = {
  fetchCategories: async () => {
    try {
      const { data, error } = await supabase
        .from("filter_categories")
        .select("*");

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  fetchFiltersByCategory: async (categoryId) => {
    try {
      const { data, error } = await supabase
        .from("filters")
        .select("*")
        .eq("category_id", categoryId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching filters:", error);
      throw error;
    }
  },

  fetchAllFilters: async () => {
    try {
      const { data, error } = await supabase.from("filters").select("*");

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching all filters:", error);
      throw error;
    }
  },
};

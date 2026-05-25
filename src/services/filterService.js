const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_APIKEY;

const headers = {
  "Content-Type": "application/json",
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
};

export const filterService = {
  fetchCategories: async () => {
    try {
      const response = await fetch(`${URL}/rest/v1/filter_categories`, {
        method: "GET",
        headers,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  fetchFiltersByCategory: async (categoryId) => {
    try {
      const response = await fetch(
        `${URL}/rest/v1/filters?category_id=eq.${categoryId}`,
        {
          method: "GET",
          headers,
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch filters");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching filters:", error);
      throw error;
    }
  },

  fetchAllFilters: async () => {
    try {
      const response = await fetch(`${URL}/rest/v1/filters`, {
        method: "GET",
        headers,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch all filters");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching all filters:", error);
      throw error;
    }
  },
};

import { createContext } from "react";

export const FilterContext = createContext({
  selectedFilters: [],
  setSelectedFilters: () => {},
});
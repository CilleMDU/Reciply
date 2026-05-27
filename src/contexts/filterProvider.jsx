import { useState } from "react";
import { FilterContext } from "./filterContext";

export default function FilterProvider({ children }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  return (
    <FilterContext.Provider value={{ selectedFilters, setSelectedFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
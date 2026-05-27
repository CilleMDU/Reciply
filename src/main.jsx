import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/home.css'
import './styles/profil.css'
import './styles/indkobsliste.css'
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import RecipeProvider from "./contexts/recipeProvider";
import FilterProvider from "./contexts/filterProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RecipeProvider>
        <FilterProvider>
        <App />
        </FilterProvider>
      </RecipeProvider>
    </BrowserRouter>
  </StrictMode>,
);

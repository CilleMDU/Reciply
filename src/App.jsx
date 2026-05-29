import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import ErrorPage from "./pages/errorPage/errorPage";
import RecipeCreationFirst from "./pages/recipeCreation/recipePicture/recipePicture";
import RecipeCreationSecond from "./pages/recipeCreation/recipeDetails/recipeDetails";
import RecipeEditFirst from "./pages/recipeEdit/recipePictureEdit/recipePictureEdit";
import RecipeEditSecond from "./pages/recipeEdit/recipeDetailsEdit/recipeDetailsEdit";
import FilterAdd from "./pages/filterAdd/filterAdd";
import "./App.css";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import RecipeDisplay from "./pages/recipeDisplay/recipeDisplay";
import TipsOgTricks from "./pages/tips/tips";
import AllergiTips from "./pages/tips/allergiTips";
import Lactose from "./pages/tips/lactose/lactose";
import Indkobsliste from "./pages/Indkobsliste";
import IndkobOversigt from "./pages/IndkobOversigt";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        
        <Route path="/homepage" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/indkobOversigt" element={<IndkobOversigt/>} />
        <Route path="/indkobsliste/:listId" element={<Indkobsliste />} />
        <Route path="/createRecipeFirst" element={<RecipeCreationFirst />} />
        <Route path="/" element={<Home />} />
        <Route path="/createRecipe" element={<RecipeCreationFirst />} />
        <Route path="/recipeDetails" element={<RecipeCreationSecond />} />
        <Route path="/edit/:recipeId" element={<RecipeEditFirst />} />
        <Route
          path="/editRecipeDetails/:recipeId"
          element={<RecipeEditSecond />}
        />
        <Route path="/filterAdd" element={<FilterAdd />} />
        <Route path="/recipe/:recipeId" element={<RecipeDisplay />} />
        <Route path="/tipsOgTricks" element={<TipsOgTricks />} />
        <Route path="/allergiTips" element={<AllergiTips />} />
        <Route path="/tipsOgTricks/lactose" element={<Lactose />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

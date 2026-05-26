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
import RecipeDisplay from "./pages/recipeDisplay/recipeDisplay";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

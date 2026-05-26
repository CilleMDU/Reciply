import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import ErrorPage from "./pages/errorPage/errorPage";
import RecipeCreationFirst from "./pages/recipeCreation/recipePicture/recipePicture";
import RecipeCreationSecond from "./pages/recipeCreation/recipeDetails/recipeDetails";
import FilterAdd from "./pages/filterAdd/filterAdd";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createRecipe" element={<RecipeCreationFirst />} />
        <Route path="/recipeDetails" element={<RecipeCreationSecond />} />
        <Route path="/filterAdd" element={<FilterAdd />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

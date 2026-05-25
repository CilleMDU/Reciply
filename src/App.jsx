import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Feed from "./pages/feed/feed";
import ErrorPage from "./pages/errorPage/errorPage";
import RecipeCreationFirst from "./pages/recipeCreation/recipePicture/recipePicture";
import "./App.css";
import Home from "./pages/Home";
import Profil from "./pages/Profil";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/profilpage" element={<Profil/>}/>
        <Route path="/createRecipeFirst" element={<RecipeCreationFirst />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

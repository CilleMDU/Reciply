import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Feed from "./pages/feed/feed";
import FilterPreview from "./pages/filterPreview/filterPreview";
import ErrorPage from "./pages/errorPage/errorPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/filter-preview" element={<FilterPreview />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

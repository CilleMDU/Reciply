import { Routes, Route } from "react-router-dom";
import Feed from "./pages/feed/feed";
import ErrorPage from "./pages/errorPage/errorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

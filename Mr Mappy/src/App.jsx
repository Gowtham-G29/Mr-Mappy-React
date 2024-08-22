import Landpage from "./Landpage";
import Dashboard from "../../../Mr.Mappy_project-main/dash";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mappy from "./pages/Mappy";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Mappy/>} />
          <Route path="/" element={<Landpage />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Mappy" element={<Mappy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

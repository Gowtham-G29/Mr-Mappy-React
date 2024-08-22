import Landpage from "./Landpage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/" element={<Landpage />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

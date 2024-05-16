import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Post } from "./pages/Post";
import { Landingpage } from "./pages/Landingpage";
import { Login } from "./pages/Login";
import { Profile } from "./pages/profile";
import { Settings } from "./pages/Settings";

function App() {
  return (
    <div className="bg-light-white">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;

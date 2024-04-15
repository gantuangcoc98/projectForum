import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Welcome } from "./pages/Welcome";
import { Post } from "./pages/Post";
import { Landingpage } from "./pages/Landingpage";
import { Login } from "./pages/Login";

function App() {
  return (
    <div className="bg-light-white">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;

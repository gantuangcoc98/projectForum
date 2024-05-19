import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Post } from "./pages/Post";
import { Landingpage } from "./pages/Landingpage";
import { Login } from "./pages/Login";
import { NewPost } from "./pages/NewPost";
import { EditPost } from "./pages/EditPost";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";

function App() {
  return (
    <div className="bg-light-white">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/post/new" element={<NewPost />} />
        <Route path="/post/:postId/edit" element={<EditPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css"
import logo from "./logo.png";
import { useNavigate } from 'react-router-dom';

export default function AppBar() {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/login");
    }

    return (
        <div className="">
            
        </div>
    )
};
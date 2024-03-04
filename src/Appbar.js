import Button from "./Button";
import "./App.css"
import logo from "./logo.png";

const handleClick = (event) => {
    console.log("Button clicked");
}

export default function AppBar() {
    return (
        <div className="Appbar_container">
            <div className="logo_title_container">
                <img src={logo} alt="Logo" style={{width: "auto", height: "69px"}}></img>
                <h2>TEKMUNITY</h2>
            </div>

            <Button text={"Login"} color={"#280000"} onclick={(event) => handleClick()}/>            
        </div>
    );
};
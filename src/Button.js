export default function Button({text, color, onclick}) {
    return (
        <button style={
            {
                backgroundColor: color,
                borderStyle: "none",
                cursor: "pointer",
                padding: "10px 20px",
                borderRadius: "12px",
                color: "white",
                fontWeight: "bolder",
                fontSize: "16px",
            }}
            onClick={(event) => onclick}
        >{text}</button>
    );
}
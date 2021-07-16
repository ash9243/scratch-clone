import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

document.getElementsByTagName("body")[0].style.margin = "0px";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

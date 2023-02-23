import React from "react";
import ReactDOM from "react-dom/client";
import App from "./my-app";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App
      defaultPosition={{
        lat: 51.5,
        lng: -0.12,
      }}
    />
  </React.StrictMode>
);

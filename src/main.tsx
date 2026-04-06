import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";

// Remove the static boot screen once React takes over
const staticBoot = document.getElementById("boot-static");
if (staticBoot) staticBoot.remove();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

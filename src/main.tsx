import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";

// Remove the static boot screen once React takes over
const staticBoot = document.getElementById("boot-static");
if (staticBoot) staticBoot.remove();

// Load Google Fonts lazily — completely off the critical path
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&family=Rajdhani:wght@400;500;600;700&family=Black+Ops+One&display=swap";
document.head.appendChild(fontLink);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

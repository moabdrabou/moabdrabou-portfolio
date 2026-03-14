import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";
import faviconUrl from "./assets/favicon.svg";

const link = document.createElement("link");
link.rel = "icon";
link.type = "image/svg+xml";
link.href = faviconUrl;
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

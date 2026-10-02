import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ToastProvider } from "./components/common/ToastContext";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);

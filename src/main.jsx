import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_Server_Url;
console.log(import.meta.env.VITE_Server_Url)
// axios.defaults.baseURL="https://izhmw2qjmx.us-east-2.awsapprunner.com/"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

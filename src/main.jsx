import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
axios.defaults.baseURL = "http://sms-send-pro-env-2.eba-p8erzb34.us-east-2.elasticbeanstalk.com/";
// axios.defaults.baseURL = "https://backend-5b02geagv-arslanbinjaffar.vercel.app/";
// axios.defaults.baseURL = "http://localhost:7000/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

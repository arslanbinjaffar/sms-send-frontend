import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpForm from "./pages/SignUp";
import SignInForm from "./pages/signIn";
import MessageSender from "./pages/MessageSender";
import NotFoundPage from "./pages/PageNotFound";
const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<SignInForm />} />
      <Route path="/" element={
        <ProtectedRoute>
        <MessageSender />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;



const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem("acesss_token");
  if (!token) {
    return <Navigate to={"/login"}/>
  }
  return <>
  {children}
  </>

}

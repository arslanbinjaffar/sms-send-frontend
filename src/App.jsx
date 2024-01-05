import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./pages/SignUp";
import SignInForm from "./pages/signIn";
import MessageSender from "./pages/MessageSender";
import NotFoundPage from "./pages/PageNotFound";
const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<SignInForm />} />
      <Route path="/" element={<MessageSender />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

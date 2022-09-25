import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Screens/Auth/SignIn";
import SignUp from "./Screens/Auth/SignUp";

const AuthRouting = () => {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/createAccount" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AuthRouting;
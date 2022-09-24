import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Screens/Auth/SignIn";
import SignUp from "./Screens/Auth/SignUp";
import Details from "./Screens/Details";
import Home from "./Screens/Home";

const Routing = () => {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/createAccount" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/details/Id=:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Routing;
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./Screens/Details";
import Home from "./Screens/Home";

const Routing = () => {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/Id=:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Routing;
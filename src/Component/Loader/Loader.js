import React from "react";
import Loader from "react-js-loader";
import { useSelector } from "react-redux";
import './loader.css'

const Loading = () => {

  const isLoader = useSelector((state) => state.common.showLoader);

  return (
    <>
      {isLoader && (
        <div className="loader_page">
          <Loader type="spinner-cub" bgColor={"#FF4500"} size={100} />
        </div>
      )}
    </>
  );
};

export default Loading;
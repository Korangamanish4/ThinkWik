import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { timeOutTime } from "../Config/SetTimeOut-Config";
import { ClearReducer, hideLoader, showLoader } from "../Store/Actions/commonAction";
import '../Styles/header.css'
import { UserContext } from "./UserContext";

const Header = () => {

  const setIsLoggedIn = useContext(UserContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userDetail = useSelector((state) => state.user.userDetail);

  const signOutUser = () => {
    dispatch(showLoader())
    localStorage.setItem("isLoggedIn", false)
    setTimeout(() => {
      navigate("/")
      dispatch(ClearReducer())
      dispatch(hideLoader())
      setIsLoggedIn(false)
    },timeOutTime)
  }

  return (
    <div className="header">
      <div className="email">
      <h1>{userDetail?.email}</h1>
      </div>
      <div className="signOutButton">
      <button onClick={() => signOutUser()}>Sign Out</button>
      </div>
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { showLoader, hideLoader } from "../../Store/Actions/commonAction"
import "../../Styles/signIn.css";

const SignIn = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);

  const authenticate = () => {
    if (userName == null || password == null){
      toast("Please provide Credentials")
    }
    else {
      dispatch(showLoader())
      setTimeout(() => {
        if ( userDetail?.userName.toUpperCase() === userName.toUpperCase()){
          if (userDetail?.password === password){
            navigate("home")
          }
          else toast("Incorrect Password")
        }
        else toast("User not Found")
        dispatch(hideLoader())
      },5000)
  }
  }

  return (
    <div className="container">
      <div className="signInCard">
        <p1>Let's keep things Moving</p1>
        <div className="userName">
          <h3>User Name</h3>
        </div>
        <input
          type="text"
          className="signInInput"
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="password">
          <h3>Password</h3>
        </div>
        <input
          type="password"
          className="signInInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" onClick={() => authenticate()}>Sign In</button>
        <p onClick={() => navigate("createAccount")}>Create Account ?</p>
      </div>
    </div>
  );
};

export default SignIn;

import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../Store/Actions/userAction";
import { showLoader, hideLoader } from "../../Store/Actions/commonAction"
import { toast } from 'react-toastify';
import "../../Styles/signIn.css";

const SignUp = () => {

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveData = () => {
    if(userName == null || password == null || email == null){
      toast("Please Fill Details Properly")
    }
    else if (/\S+@\S+\.\S+/.test(email) === false){
      toast("Please provide valid Email Id")
    }
    else if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password) === false){
      toast("Password should be Alphanumeric and of minimum 8 characters as Admin@123")
    }
    else {
      const details = {
        userName : userName,
        password : password,
        email : email,
      }
      dispatch(saveUserData(details))
      dispatch(showLoader())
      setTimeout(() => {
        dispatch(hideLoader())
        toast("Account Created")
        navigate('/')
      },5000)
    }
  }

  return (
    <div className="container">
      <div className="signUpCard">
        <p1>Create Account</p1>
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
        <div className="email">
          <h3>Email</h3>
        </div>
        <input
          type="text"
          className="signInInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="button" onClick={() => saveData()}>Create Account</button>
        <p onClick={() => navigate("/")}>Back</p>
      </div>
    </div>
  )
}

export default SignUp
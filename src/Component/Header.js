import React from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import '../Styles/header.css'

const Header = () => {
  const userDetail = useSelector((state) => state.user.userDetail);

  return (
    <div className="header">
      <div className="email">
      <h1>{userDetail?.email}</h1>
      </div>
      <div className="signOutButton">
      <button onClick={() => toast("Signed Out")}>Sign Out</button>
      </div>
    </div>
  );
};

export default Header;

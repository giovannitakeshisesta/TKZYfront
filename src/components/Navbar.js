import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <div id="navbar" className="topBtnStyle topLeftPosition">
      {user ? (
        <div>
          <Link to="/" className="fa-solid fa-house-chimney topBtnStyle"></Link>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;

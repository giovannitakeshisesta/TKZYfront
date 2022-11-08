import "./HomeLogged.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/AccessTokenStore";
import tablesImg from "../../assets/tables.jpeg";
import kitchenImg from "../../assets/kitchen2.jpeg";
import menuImg from "../../assets/menu.jpeg";

export default function HomeLogged() {
  return (
    <>
      {/* FOTOS AND LINKS */}
      <div className="homeBody">
        <NavLink
          to="/menu"
          className="homeLink bckgrdCover menuImg "
          style={{ backgroundImage: `url(${menuImg})` }}
        ></NavLink>

        <NavLink
          to="/tablesPage"
          className="homeLink bckgrdCover tableImg"
          style={{ backgroundImage: `url(${tablesImg})` }}
        ></NavLink>

        <NavLink
          to="/kitchenPage"
          className="homeLink bckgrdCover kitchenImg"
          style={{ backgroundImage: `url(${kitchenImg})` }}
        ></NavLink>
      </div>

      {/* LOG OUT AND EXTRAS */}
      <div className="dropend logOutDiv">
        <i
          className="fa-solid fa-arrow-right-from-bracket topBtnStyle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></i>

        <div className="dropdown-menu">
          <button className=" dropdown-item " onClick={logout}>
            <b>Log out</b>
          </button>
        </div>
      </div>
    </>
  );
}

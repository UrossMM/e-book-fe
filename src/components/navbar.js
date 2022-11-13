import { React, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const { pathname } = location;

    const splitLocation = pathname.split("/");

  return (
    <div>
    <ul className="ulNavbar">
      <li  className={splitLocation[1] === "admin" ? "liNavbar active" : "liNavbar"}>
        <a href="/admin">Korisnici</a>
      </li>
      <li className={splitLocation[1] === "filterMeals" ? "liNavbar active" : "liNavbar"}>
        <a href="/filterMeals">Obroci</a>
      </li>
      <li className={splitLocation[1] === "templates" ? "liNavbar active" : "liNavbar"}>
        <a href="/templates">Sabloni</a>
      </li>
      <li className={splitLocation[1] === "foodstuffs" ? "liNavbar active" : "liNavbar"}>
        <a href="/foodstuffs">Namirnice</a>
      </li>
      <li  className={splitLocation[1] === "settings" ? "liNavbar active" : "liNavbar"} > 
        <a  href="/settings">
          Podesavanja
        </a>
      </li>
      <li className="liNavbar logout" id="rightLiNavbar">
        <a href="/login">Logout</a>
      </li>
    </ul>
    </div>
  );
};
export default Navbar;

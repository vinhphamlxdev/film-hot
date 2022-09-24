import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = ({ title = "", to, icon }) => {
  return (
    <NavLink
      className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
      // className="menu-item"
      // style={(nav) => ({ active: nav.isActive })}
      to={to}
    >
      {icon}
      <span className="ml-3 menu-item__title hide-on-mobile-tablet">
        {title}
      </span>
    </NavLink>
  );
};

export default MenuItem;

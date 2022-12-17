import React from "react";
import { NavLink } from "react-router-dom";

import "./PagesLinks.css";

function PagesLinks() {

  function getLinkClass(obj) {
    let className = "page-link";
    if (obj.isActive) {
      className += " page-link_activ";
    }
    return className;
  };

  return (
    <div className="pages-links-block">
      <NavLink to="/" end className={getLinkClass}>Все вина</NavLink>
      <NavLink to="/italy" className={getLinkClass}>Вина Италии</NavLink>
      <NavLink to="/spain" className={getLinkClass}>Вина Испании</NavLink>
      <NavLink to="/france" className={getLinkClass}>Вина Франции</NavLink>
      <NavLink to="/new-world" className={getLinkClass}>Вина Нового Света</NavLink>
    </div>
  );
}

export default PagesLinks;
import React from "react";
import { NavLink } from "react-router-dom";

import "./PageLinks.css";

function PagesLinks() {

  function getLinkClass(obj) {
    let className = "page-link";
    if (obj.isActive) {
      className += " page-link-activ";
    }
    return className;
  };

  return (
    <div className="pages-links-block">
      <NavLink to="/" end className={getLinkClass}>Все</NavLink>
      <NavLink to="/items-page1" className={getLinkClass}>1</NavLink>
      <NavLink to="/items-page2" className={getLinkClass}>2</NavLink>
      <NavLink to="/items-page3" className={getLinkClass}>3</NavLink>
      <NavLink to="/items-page4" className={getLinkClass}>4</NavLink>
    </div>
  );
}

export default PagesLinks;
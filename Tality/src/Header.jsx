import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logoHeader">
          <h1 className="logo-text">Tality</h1>
        </div>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <ul>
            <li>
              <NavLink to="/" className="active" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/job-listings" className="active">
                Job Listings
              </NavLink>
            </li>
            <li>
              <NavLink to="/career-resources" className="active">
                Career Resources
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className="active">
                About Tality
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="menu-icon" onClick={toggleNavbar}>
          <div className={`bar ${isOpen ? "change" : ""}`}></div>
          <div className={`bar ${isOpen ? "change" : ""}`}></div>
          <div className={`bar ${isOpen ? "change" : ""}`}></div>
        </div>
      </nav>
    </>
  );
}

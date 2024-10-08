import React, { useState } from "react";

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
              <a href="#Home">Home</a>
            </li>
            <li>
              <a href="#Job-Listings">Job Listings</a>
            </li>
            <li>
              <a href="#Career-Resources">Career Resources</a>
            </li>
            <li>
              <a href="#About-Us">About Us</a>
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

import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="main">
      {/* <h3 className="titles">Portfolio</h3> */}
      {/* <p className="footer-navigation">
        <li className="nav-items" selected>
          <Link to="/">Home</Link>
        </li>
        |
        <li className="nav-items">
          <Link to="/service">Service</Link>
        </li>
        |
        <li className="nav-items">
          <Link to="/about">About</Link>
        </li>
        |
        <li className="nav-items">
          <Link to="/project">Project</Link>
        </li>
        |
        <li className="nav-items">
          <Link to="/contact">Contact</Link>
        </li>
      </p> */}
      <p className="copy-rights">Copyright 2024 Portfolio | All Rights Reserved.</p>
    </div>
  );
};

export default Footer;

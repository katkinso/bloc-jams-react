import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => (
  <nav className="d-flex flex-column mb-3 align-items-stretch">
    <div>
      <NavLink exact className="nav-link logo" to="/">
            <img src="/assets/images/bloc-jams-logo.png" alt="bloc jams logo" />
      </NavLink>
    </div>
    <div>
      <NavLink exact className="nav-link" to="/">
        Home
      </NavLink>
    </div>
    <div>
      <NavLink exact className="nav-link" to="/library">
        Jam Library
      </NavLink>
    </div>
  </nav>
);

export default Navigation;
 
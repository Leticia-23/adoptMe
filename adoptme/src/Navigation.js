import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./environment";

import { toImageUrl } from "./api/Api";

function Navigation() {
  let { user: currentUser } = useContext(UserContext);

  // TODO: fix navbar expand toggler

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-sm navbar-light p-3">
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {/*  <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/institutions">
                Institutions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/animals">
                Animals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/aboutUs">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/adminPanel">
                Admin panel
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/institutionPanel">
                Institution panel
              </NavLink>
            </li>
            <li className="nav-item">
              {/* If logged, show profile photo. If not, show Log in botton. */}
              {currentUser ? (
                <NavLink className="nav-link" to="/profile">
                  <img
                    src={
                      currentUser.avatar
                        ? toImageUrl(currentUser.avatar)
                        : "/assets/person-circle.svg"
                    }
                    className="rounded-circle"
                    style={{ width: 40, height: 40 }}
                    alt="Profile"
                  />
                </NavLink>
              ) : (
                <NavLink className="nav-link" to="/login">
                  Log In
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;

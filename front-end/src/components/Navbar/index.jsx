import * as React from 'react';
import { NavLink } from "react-router-dom";
import BoxNotifications from '../BoxNotifications';

export default function Navbar() {
  



  return (
    <nav className="navbar navbar-expand-md navbar-dark navbar-position">
          
          <ul className="navbar-nav flex-row justify-content-between color-1 rounded navbar-position position-list
                     position-md-static list-width-md mx-auto mx-md-2 my-5 my-md-0 font-title">
              <li className="nav-item li-navbar-size">
                <NavLink id="mosaiklink" className="nav-link d-flex flex-column align-items-center text-light" to="/app/feeds">
                  <span className="material-icons mx-3">hub</span>
                  <span className="d-none d-md-block">Mosaïque</span>
                </NavLink>
              </li>
              <li className="nav-item li-navbar-size">
                <NavLink className="nav-link d-flex flex-column align-items-center text-light" to="#">
                  <span className="material-icons mx-3">list_alt</span>
                  <span className="d-none d-md-block">Thèmes</span>
                </NavLink>
              </li>
              <li className="nav-item li-navbar-size">
                <NavLink className="nav-link d-flex flex-column align-items-center text-light" to="/app/post">
                  <span className="material-icons mx-3">chat</span>
                  <span className="d-none d-md-block">Post</span>
                </NavLink>
              </li>
              <li className="nav-item li-navbar-size mx-md-1">                
                <NavLink className="nav-link d-flex flex-column align-items-center text-light" to="#">
                  <span className="material-icons mx-3">search</span>
                  <span className="d-none d-md-block">Rechercher</span>
                </NavLink>
              </li>
              <li className="nav-item li-navbar-size mx-md-1">
                <BoxNotifications/>
              </li>
            </ul>
        </nav>
    
  );
}
import React, { Component } from "react";
import './Navbar.scss';

class Navbar extends Component {
  state = {};

  render() {
    return <div className="navbar-wrapper flex">
        <div className="logo">
            <img src='images/logo.png'/>
        </div>
        <div className="login-container flex pointer">
            <div className="login-item flex ">Contact Us</div>
            <div className="login-item flex ">Login</div>
        </div>
    </div>;
  }
}

export default Navbar;

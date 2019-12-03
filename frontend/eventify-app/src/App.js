import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./components/Users/Users";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Navbar from "./components/Navbar/Navbar";
import videos from "./assets/video.mp4";

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />

        <div className="content">
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/userhome" component={Users} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
      <video autoPlay muted loop id="myVideo">
        <source src={videos} type="video/mp4" />
      </video>
    </Router>
  );
}

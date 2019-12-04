import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./components/Users/Users";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Navbar from "./components/Navbar/Navbar";
import videos from "./assets/video.mp4";
import UserCreate from "./components/UserCreate/UserCreate";
import Test from "./components/Test/Test";

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />

        <div className="content">
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/userhome" component={Users} />
            <Route path="/createuser/:id" component={UserCreate} />
            <Route path="/" component={Test} />
          </Switch>
        </div>
      </div>
      <video autoPlay muted loop id="myVideo">
        <source src={videos} type="video/mp4" />
      </video>
    </Router>
  );
}

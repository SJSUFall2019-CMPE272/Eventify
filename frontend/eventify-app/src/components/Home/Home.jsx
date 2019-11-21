import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Home.scss";

class Home extends Component {
  state = {};

  render() {
    return (
      <div className="home-wrapper">
        <div className="home-headbar flex">
          <div className="bar-tabs pad-around full-height flex">Title</div>
          <div className="bar-tabs pad-around full-height flex">Subtitle</div>
          <div className="bar-tabs pad-around full-height flex">Next Title</div>
        </div>
        <div className="home-container">
          <Carousel infiniteLoop={true} autoPlay={true} interval="5000" dynamicHeight={true} transitionTime="500" showThumbs={false}>
            <div>
              <img src={require("../../assets/images/bg.jpg")} />
            </div>
            <div>
              <img src={require("../../assets/images/bg.jpg")} />
            </div>
            <div>
              <img src={require("../../assets/images/bg.jpg")} />
            </div>
          </Carousel>
        </div>
      </div>
    );
  }

  navigateUsers = () => {
    console.log(this);
    this.props.history.push("/users");
  };
}

export default Home;

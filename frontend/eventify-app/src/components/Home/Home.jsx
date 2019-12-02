import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { withRouter } from "react-router-dom";
import "./Home.scss";

class Home extends Component {
  state = {};

  render() {
    return (
      <div className="home-wrapper">
        <div className="home-container">
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            transitionTime={500}
            showThumbs={false}
          >
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
}

export default withRouter(Home);

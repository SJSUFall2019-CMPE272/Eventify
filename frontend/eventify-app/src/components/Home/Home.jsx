import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { withRouter } from "react-router-dom";
import "./Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faGoogle
} from "@fortawesome/free-brands-svg-icons";
class Home extends Component {
  state = {};

  render() {
    let privilegeLevel = sessionStorage.getItem("privileges");
    if (privilegeLevel == "organizer") {
      this.props.history.push("/userhome");
    } else if (privilegeLevel == "admin") {
      this.props.history.push("/admin");
    }
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
              <img src={require("../../assets/images/bg1.jpg")} />
            </div>
            <div>
              <img src={require("../../assets/images/bg2.jpg")} />
            </div>
          </Carousel>

          <div className="footer row flex">
            <div className="col-sm-3 footer-col">
              <div className="logo-img"></div>
              <div className="col-sm-12">
                RFID tracking app to track attendees at events and generate
                leads.
              </div>
              <div className="icon-app col-sm-12">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faGoogle} />
              </div>
            </div>
            <div className="col-sm-3 footer-col">
              <h4 className="lightblue">Navigation:</h4>
              <br />
              <div>Home</div>
              <div>How it works</div>
              <div>Pricing</div>
            </div>
            <div className="col-sm-3 footer-col">
              <h4 className="lightblue">Useful Links:</h4>
              <br />
              <div>My Account</div>
              <div>About Us</div>
              <div>FAQ</div>
            </div>
            <div className="col-sm-3 footer-col">
              <h4 className="lightblue">Contact Details:</h4>
              <br />
              <div>SJSU Campus, San Jose, California - 95126</div>
              <div>Phone: +1-123-456-7890</div>
              <div>Email: help@eventify.com</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);

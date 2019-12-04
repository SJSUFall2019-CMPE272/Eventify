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
import {
  faFileContract,
  faStreetView,
  faTasks,
  faRoute
} from "@fortawesome/free-solid-svg-icons";
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
          <div className="container">
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
            <header className="jumbotron my-4 flex">
              <div className="display-3 col-sm-4">
                <img
                  className=" w-100"
                  src={require("../../assets/images/image.png")}
                />
              </div>
              <div className="lead col-sm-8">
                <h2>End-To-End Event Management. Reimagined.</h2>
                Make your events & conferences more successful than ever before,
                with Eventify - an event management platform. Discover the
                advantages of efficient event management.
              </div>
            </header>

            <div className="row text-center">
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <FontAwesomeIcon icon={faTasks}></FontAwesomeIcon>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Efficient Event Management</h4>
                    <p className="card-text">
                      Managing numerous vendors and speakers participating in
                      the events.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <FontAwesomeIcon icon={faStreetView}></FontAwesomeIcon>
                  </div>

                  <div className="card-body">
                    <h4 className="card-title">Track Attendees</h4>
                    <p className="card-text">
                      Stay informed about visitor counts, the stalls they are
                      visiting, time spent at various keynotes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <FontAwesomeIcon icon={faFileContract}></FontAwesomeIcon>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Lead Generation</h4>
                    <p className="card-text">
                      Check out visual representations of event attendee
                      analytics.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <FontAwesomeIcon icon={faRoute}></FontAwesomeIcon>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Convenient User Navigation</h4>
                    <p className="card-text">
                      Providing information know about a particular stall to
                      attendees without spending much time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <header className="jumbotron flex bottom-jum">
              <div className="lead col-sm-8">
                <h3>Insightful Analytics</h3>
                Custom-generated, in-depth analytics to track interactions,
                segregations, and other updates.
              </div>
              <div className="display-3 col-sm-4">
                <img src={require("../../assets/images/analytics.png")} />
              </div>
            </header>
          </div>
        </div>
        <div className="footer row flex">
          <div className="footer row flex" id="footer">
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

import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "./Users.scss";
import AddVendor from "./AddVendor";
import EditVendor from "./EditVendor";
import UserHome from "./UserHome";
import Report from "./Report";
import axios from "axios";

class Users extends Component {
  state = {
    vendorList: [],
    sidebarTabs: ["Intro", "Add Vendors", "View Vendors", "Reports"],
    activeTab: 0
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/vendor/" + sessionStorage.getItem("email"))
      .then(response => {
        console.log(response.data.result);
        this.setState({ vendorList: response.data.result });
      });
  }

  onSelectNewTab = index => {
    this.setState({ activeTab: index });
  };

  render() {
    let route;

    let renderSidebarTabs = this.state.sidebarTabs.map((tab, i) => {
      return (
        <button
          className={
            "sidebar-item list-group-item list-group-item-action " +
            (this.state.activeTab == i ? "active" : "")
          }
          key={i}
          onClick={e => this.onSelectNewTab(i)}
        >
          {tab}
        </button>
      );
    });

    switch (this.state.activeTab) {
      case 0:
        route = <UserHome />;
        break;
      case 1:
        route = <AddVendor onModify={this.componentDidMount.bind(this)} />;
        break;
      case 2:
        route = (
          <EditVendor
            vendorList={this.state.vendorList}
            onModify={this.componentDidMount.bind(this)}
          />
        );
        break;
      case 3:
        route = <Report />;
        break;
      default:
        route = null;
    }

    return (
      <React.Fragment>
        <div className="userhome-wrapper col-md-12 screen-wrapper">
          <div className="card accordion-container flex">
            <div className="col-sm-2 sidebar">{renderSidebarTabs}</div>
            <div className="col-sm-10 sidebar-content">{route}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Users;

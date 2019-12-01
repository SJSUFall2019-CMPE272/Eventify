import React, { Component } from "react";
import "./Admin.scss";
import AdminHome from "./AdminHome/AdminHome";
import AddEvent from "./AddEvent/AddEvent";
import EditEvent from "./EditEvent/EditEvent";
import axios from "axios";

class Admin extends Component {
  state = {
    sidebarTabs: ["Intro", "Create Event", "View Events"],
    activeTab: 0,
    eventList: []
  };

  onSelectNewTab = index => {
    this.setState({ activeTab: index });
  };

  componentDidMount() {
    axios.get("http://localhost:5000/events").then(response => {
      this.setState({ eventList: response.data.result });
    });
  }

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
        route = <AdminHome />;
        break;
      case 1:
        route = <AddEvent />;
        break;
      case 2:
        route = <EditEvent eventList={this.state.eventList} />;
        break;
      default:
        route = null;
    }

    return (
      <div className="adminhome-wrapper col-md-12 screen-wrapper">
        <div className="card options-container flex">
          <div className="col-sm-2 sidebar">{renderSidebarTabs}</div>
          <div className="col-sm-10 sidebar-content">{route}</div>
        </div>
      </div>
    );
  }
}

export default Admin;

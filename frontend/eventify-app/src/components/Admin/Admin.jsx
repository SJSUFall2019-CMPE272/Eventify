import React, { Component } from "react";
import "./Admin.scss";
import AdminHome from "./AdminHome/AdminHome";
import AddEvent from "./AddEvent/AddEvent";
import EditEvent from "./EditEvent/EditEvent";

class Admin extends Component {
  state = {
    sidebarTabs: ["Intro", "Create Event", "View Events"],
    activeTab: 0
  };

  onSelectNewTab = index => {
    this.setState({ activeTab: index });
  };

  renderContent() {
    switch (this.state.activeTab) {
      case 0:
        return <AdminHome />;
      case 1:
        return <AddEvent />;
      case 2:
        return <EditEvent />;
      default:
        return null;
    }
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
        route = <EditEvent />;
        break;
      default:
        route = null;
    }

    return (
      <div className="adminhome-wrapper col-md-12 screen-wrapper">
        <div className="card options-container flex">
          <div className="col-sm-4 sidebar">{renderSidebarTabs}</div>
          <div className="col-sm-8 sidebar-content">{route}</div>
        </div>
      </div>
    );
  }
}

export default Admin;

import React, { Component } from "react";

class AdminHome extends Component {
  state = {};
  render() {
    return (
      <div className="tab-content">
        <h1 className="header">Admin Home</h1> <div class="border-div"></div>
        <div className="col-sm-12">
          This is the admin page.
          <br />
          You can create or view events here.
          <br />
          In the view events tab, you can view stats for various events
          available.
        </div>
      </div>
    );
  }
}

export default AdminHome;

import React, { Component } from "react";

class AddEvent extends Component {
  state = {};
  render() {
    return (
      <div className="tab-content">
        <div className="tab-header">
          <h1>Add Event</h1>
          <p>
            Here you can add a new event and specify details about the same.
          </p>
        </div>
        <div className="tab-body"></div>
      </div>
    );
  }
}

export default AddEvent;

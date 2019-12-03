import React, { Component } from "react";

class UserHome extends Component {
  state = {};
  render() {
    console.log(this.props.profile);
    return (
      <div className="tab-content">
        <h1 className="header">User Home</h1> <div class="border-div"></div>
        <p>
        {this.props.profile.first_name}<br/>
        {this.props.profile.last_name}<br/>
        {this.props.profile.email}<br/>
        {this.props.profile.phone_num}<br/>
        {this.props.profile.event_name}<br/>
        {this.props.profile.event_desc}<br/>
        {this.props.profile.event_location}<br/>
        {new Date(this.props.profile.event_date_from).toLocaleDateString()}<br/>
        {new Date(this.props.profile.event_date_to).toLocaleDateString()}

        </p>
      </div>
    );
  }
}

export default UserHome;

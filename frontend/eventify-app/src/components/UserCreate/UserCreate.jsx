import React, { Component } from "react";
import "./UserCreate.scss";
import axios from "axios";

class UserCreate extends Component {
  state = {
    event_name: ""
  };

  componentDidMount() {
    const name = this.props.match.params.id;
    this.setState({ event_name: name });

    axios.post("http://localhost:5000/getOrganizer/" + name).then(response => {
      console.log(response);
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-md-8 screen-wrapper margin-center">
          <div className="card create-login flex">
            <h2>Welcome to {this.state.event_name}!</h2>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserCreate;

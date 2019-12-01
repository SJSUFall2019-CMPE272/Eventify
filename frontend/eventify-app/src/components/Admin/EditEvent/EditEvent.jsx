import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class EditEvent extends Component {
  state = {
    events: {}
  };

  render() {
    console.log(this.props.eventList);
    let table, header;

    if (!this.props.eventList.length) header = <p>No Events Found</p>;
    else {
      table = this.props.eventList.map((currEvent, index) => {
        if (currEvent.type == "Admin") return;

        return (
          <tr key={index}>
            <td>{currEvent.event_name}</td>
            <td>{currEvent.first_name}</td>
            <td>{currEvent.phone_num}</td>
            <td>{currEvent.event_location}</td>
            <td>{currEvent.event_date}</td>
            <td>
              <Button variant="primary">Edit</Button>
            </td>
            <td>
              <Button variant="danger">Delete</Button>
            </td>
          </tr>
        );
      });
      header = (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>First Name</th>
              <th>Phone no</th>
              <th>Location</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </Table>
      );
    }

    return (
      <React.Fragment>
        <div className="tab-content">
          <div className="tab-header">
            <h1>Events</h1>
            <p>
              A list of events that were added previously can be found here.
            </p>
          </div>
          <div className="tab-body">{header}</div>
        </div>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EditEvent;

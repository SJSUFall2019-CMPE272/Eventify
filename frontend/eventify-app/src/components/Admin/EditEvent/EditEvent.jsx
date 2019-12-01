import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./EditEvent.scss";

class EditEvent extends Component {
  state = {
    events: {},
    editModal: false,
    first_name: "",
    last_name: "",
    email: "",
    phone_num: "",
    event_name: "",
    event_desc: "",
    event_location: "",
    date: ""
  };

  editModalClose = () => {
    this.setState({ editModal: false });
  };

  editModalShow = event => {
    console.log(event);
    this.setState({
      editModal: true,
      first_name: event.first_name,
      last_name: event.last_name,
      email: event.email,
      phone_num: event.phone_num,
      event_name: event.event_name,
      event_desc: event.event_desc,
      event_location: event.event_location,
      date: event.event_date
    });
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
            <td>{new Date(currEvent.event_date).toLocaleDateString()}</td>
            <td>
              <Button
                variant="primary"
                onClick={e => this.editModalShow(currEvent)}
              >
                Edit
              </Button>
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
        <div className="tab-content events-wrapper">
          <div className="tab-header">
            <h1 className="header">Events</h1>
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
          show={this.state.editModal}
          onHide={this.editModalClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Event
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Edit the details of the selected event</p>
            <div className="tab-body">
              <Form noValidate>
                <Form.Group as={Row}>
                  <Form.Label column md={4}>
                    First name
                  </Form.Label>

                  <Col sm={8}>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First name"
                      value={this.state.first_name}
                      onChange={e =>
                        this.setState({ first_name: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter first name.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={4}>
                    Last name
                  </Form.Label>

                  <Col sm={8}>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last name"
                      value={this.state.last_name}
                      onChange={e =>
                        this.setState({ last_name: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter last name.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={4}>
                    Email Address
                  </Form.Label>

                  <Col sm={8}>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={this.state.email}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={4}>
                    Phone Number
                  </Form.Label>

                  <Col sm={8}>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Phone Number"
                      value={this.state.phone_num}
                      onChange={e =>
                        this.setState({ phone_num: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter phone number
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={4}>
                    Event Name
                  </Form.Label>

                  <Col sm={8}>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Event Name"
                      value={this.state.event_name}
                      onChange={e =>
                        this.setState({ event_name: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter Event Name
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={4}>
                    Event Description
                  </Form.Label>

                  <Col sm={8}>
                    <Form.Control
                      required
                      as="textarea"
                      placeholder="Event Description"
                      rows="3"
                      value={this.state.event_desc}
                      onChange={e =>
                        this.setState({ event_desc: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter Event Description
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={4}>
                    Location
                  </Form.Label>

                  <Col sm={8}>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Location"
                      value={this.state.event_location}
                      onChange={e =>
                        this.setState({ event_location: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter location
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={4}>
                    Date
                  </Form.Label>

                  <Col sm={8}>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={new Date(
                        this.state.date
                      ).toLocaleDateString()}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.updateDetails}>Update</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }

  updateDetails = () => {};
}

export default EditEvent;

import React, { Component } from "react";
import * as CanvasJSReact from "../../canvasjs.react/canvasjs.react";
import { CanvasJSChart } from "../../canvasjs.react/canvasjs.react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./EditEvent.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheck,
  faEdit,
  faTrashAlt,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";

class EditEvent extends Component {
  state = {
    events: {},
    editModal: false,
    deleteModal: false,
    first_name: "",
    last_name: "",
    email: "",
    phone_num: "",
    event_name: "",
    event_desc: "",
    event_location: "",
    date: "",
    idSelected: "",
    statsModal: false,
    arr:[],
    topfivestall:[],
    topfivespeaker:[]
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
      date_from: event.event_date_from,
      date_to: event.event_date_to
    });
  };

  onUpdate = e => {
    e.preventDefault();
    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_num: this.state.phone_num,
      event_name: this.state.event_name,
      event_desc: this.state.event_desc,
      event_location: this.state.event_location,
      date_from: this.state.date_from,
      date_to: this.state.date_to
    };
    console.log("in update function");
    axios.post("http://localhost:5000/events/update", data).then(response => {
      console.log(response.data.message);
      this.editModalClose();
      this.props.onModify();
    });
  };

  deleteOpen = e => {
    this.setState({ deleteModal: true, idSelected: e.target.value });
  };

  deleteClose = () => {
    this.setState({ deleteModal: false });
  };

  statsClose = () => {
    this.setState({ statsModal: false , arr:[], topfivestall:[], topfivespeaker:[]});
  };

  onDelete = e => {
    console.log("delete function call");
    e.preventDefault();
    let data = {
      email: this.state.idSelected
    };
    axios.post("http://localhost:5000/deleteEvent", data).then(response => {
      console.log(response.data.message);
      this.deleteClose();
      this.props.onModify();
    });
  };

  onStats = e => {
    this.setState({ statsModal: true });
    let arr=[]
    axios
      .get(
        "http://localhost:5000/users/" + e
      )
      .then(response => {
        console.log(response.data.result);
        
        if(response.data.result.length===0){
        }
        else{
        let count=0;
            response.data.result.map((currUser, index) => {
                count++;
            });

            if(!arr.length){
                arr = [
                    { label: "Total registered attendees", y: count }
                ];
            }else{
                arr.push({ label: "Total registered attendees", y: count });
            }
            axios
      .get(
        "http://localhost:5000/usersAttended/" + e
      )
      .then(response => {
        console.log(response.data.result);
        
        if(response.data.result.length===0){
        }
        else{
        let count1=0;
            response.data.result.map((currUser, index) => {
                count1++;
            });
            
            if(!arr.length){
                arr = [
                    { label: "Attendees who came to the event", y: count1}
                ];
            }else{
                arr.push({ label: "Attendees who came to the event", y: count1 });
            }
            this.setState({arr:arr});
            console.log("arrrrrrrrrrrrrrr", this.state.arr);
    }

      });
    }

      });

      axios
      .get(
        "http://localhost:5000/report/topten/" + e
      )
      .then(response => {
        console.log(response.data.result);
        
        if(response.data.result.length===0){
        }
        else{
        let b = [];
        response.data.result.map((currVendor, index) => {
          console.log(currVendor.visitors.length);
          console.log(currVendor.company_name);
          if (!b.length) {
            b = [
              { y: currVendor.visitors.length, label: currVendor.company_name }
            ];
          } else {
            b.push({ y: currVendor.visitors.length, label: currVendor.company_name });
          }
        });
        this.setState({ topfivestall: b });
    }

      });

      axios
    .get(
      "http://localhost:5000/report/toptenspeakers/" + e
    )
    .then(response => {
      console.log(response.data.result);
      if(response.data.result.length===0){
      }
      else{
      let b = [];
      response.data.result.map((currVendor, index) => {
        console.log(currVendor.visitors.length);
        console.log(currVendor.company_name);
        if (!b.length) {
          b = [
            { y: currVendor.visitors.length, label: currVendor.vendor_name+" ("+currVendor.company_name+")" }
          ];
        } else {
          b.push({ y: currVendor.visitors.length, label: currVendor.vendor_name+" ("+currVendor.company_name+")" });
        }
      });
      this.setState({ topfivespeaker: b });
    }
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
            <td>{currEvent.phone_num}</td>
            <td>{currEvent.event_location}</td>
            <td>{new Date(currEvent.event_date_from).toLocaleDateString()}</td>
            <td>{new Date(currEvent.event_date_to).toLocaleDateString()}</td>

            <td>
              <Button
                variant="outline-primary"
                onClick={e => this.editModalShow(currEvent)}
              >
                <FontAwesomeIcon icon={faEdit} />
                Edit
              </Button>
            </td>
            <td>
              <Button
                variant="outline-danger"
                onClick={e => {this.setState({deleteModal: true, idSelected: currEvent.email})}}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                Delete
              </Button>
            </td>

            <td>
              <Button
                variant="outline-info"
                onClick={e => this.onStats(currEvent.email)}
              >
                <FontAwesomeIcon icon={faChartLine} />
                Stats
              </Button>
            </td>
          </tr>
        );
      });
      header = (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Phone no</th>
              <th>Location</th>
              <th>Date From</th>
              <th>Date To</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Stats</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </Table>
      );
    }


    const options = {
      animationEnabled: true,
      theme: "light1",
      title: {
          text: "Total registered attendees vs attendees who came to the event",
          fontFamily:"Segoe UI"
      },
      axisY: {
      title: "Number of Attendees",
      },
      data: [{
          type: "column",
          indexLabel: "{y}",
          labelAngle: 180,		
          indexLabelFontColor: "black",
          dataPoints: this.state.arr
      }]
  }
  const options1 = {
    animationEnabled: true,
    exportEnabled: false,
    theme: "light1", // "light1", "dark1", "dark2"
    title: {
      text: "Top Five Stalls",
      fontFamily:"Segoe UI"
    },subtitles:[
      {
          text: "Number of attendees",
          fontSize: 15,
          fontFamily:"Segoe UI"
      }
      ],
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}",
        startAngle: -90,
        dataPoints: this.state.topfivestall
      }
    ]
  };

  const options2 = {
    animationEnabled: true,
    exportEnabled: false,
    theme: "light1", // "light1", "dark1", "dark2"
    title: {
      text: "Top Five Speakers",
      fontFamily:"Segoe UI"
    },
    subtitles:[
        {
            text: "Number of attendees",
            fontSize: 15,
            fontFamily:"Segoe UI"
        }
        ],
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}",
        startAngle: -90,
        dataPoints: this.state.topfivespeaker
      }
    ]
  };

let chart,top5,top52;
  if(this.state.arr.length===0){
    chart=<center><h3></h3></center>
  }
  else{
    chart=<p>
    <CanvasJSChart options={options} />
    </p>

  }

  if(this.state.topfivestall.length===0){
    top5= <center><h3></h3></center>
  }else{
    top5=<p>
    <CanvasJSChart options={options1} />
    </p>

  }

  if(this.state.topfivespeaker.length===0){
    top52= <center><h3></h3></center>
  }else{
    top52=<p>
    <CanvasJSChart options={options2} />
    </p>
  }

  if(this.state.arr.length===0 && this.state.topfivestall.length===0 && this.state.topfivespeaker.length===0){
    chart= <center><h3>No data available yet</h3></center>
  }
  




    return (
      <React.Fragment>
        <div className="tab-content events-wrapper">
          <div className="tab-header">
            <h1 className="header">Events</h1> <div class="border-div"></div>
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
                    Date From
                  </Form.Label>

                  <Col sm={8}>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={new Date(
                        this.state.date_from
                      ).toLocaleDateString()}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column md={4}>
                    Date To
                  </Form.Label>

                  <Col sm={8}>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={new Date(
                        this.state.date_to
                      ).toLocaleDateString()}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={e => this.onUpdate(e)}>Update</Button>
          </Modal.Footer>
        </Modal>
        <Modal centered show={this.state.deleteModal} onHide={this.deleteClose}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Delete Event
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete the event?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onDelete} variant="danger" size="sm">
              <FontAwesomeIcon icon={faCheck} />
              Yes
            </Button>
            <Button onClick={this.deleteClose} size="sm">
              <FontAwesomeIcon icon={faTimes} />
              No
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.statsModal}
          onHide={this.statsClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Event Statistics
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {chart}
            {top5}
            {top52}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }

  // updateDetails = () => {};
}

export default EditEvent;

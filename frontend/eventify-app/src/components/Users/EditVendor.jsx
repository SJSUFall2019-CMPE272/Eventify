import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';

class EditVendor extends Component {
  state = {
    events: {}
  };


  onDelete = e =>{
    console.log("delete function call");
    e.preventDefault();
      let data ={
        email:e.target.value
      };
      axios
          .post("http://localhost:5000/deleteVendor", data)
        .then(response => {
          console.log(response.data.message);
          window.location.reload(true); 
        });
    
  };

  render() {
    console.log(this.props.vendorList);
    let table, header;

    if (!this.props.vendorList.length) header = <p>No Vendors Found</p>;
    else {
      table = this.props.vendorList.map((currVendor, index) => {
        if (currVendor.type == "Admin") return;

        return (
          <tr key={index}>
            <td>{currVendor.rfid_reader_id}</td>
            <td>{currVendor.first_name}</td>
            <td>{currVendor.company_name}</td>
            <td>{currVendor.email}</td>
            <td>{currVendor.phone_num}</td>
            <td>{currVendor.vendor_type}</td>
            <td>{currVendor.vendor_desc}</td>
            <td>
              <Button variant="primary">Edit</Button>
            </td>
            <td>
              <Button variant="danger" value={currVendor.email} onClick={e=>this.onDelete(e)}>Delete</Button>
            </td>
          </tr>
        );
      });
      header = (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>RFID Reader ID</th>
              <th>First Name</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Phone no</th>
              <th>Vendor Type</th>
              <th>Vendor Description</th>
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
            <h1>Vendors</h1>
            <p>
              A list of vendors that were added previously can be found here.
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

export default EditVendor;

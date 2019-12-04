import React, { Component } from "react";

class Test extends Component {
  state = {};
  render() {
    return (
      <div className="adminhome-wrapper col-md-12 screen-wrapper">
        <div className="card options-container flex">
          <button className="btn btn-primary" onClick={this.scanQR}>
            Scan
          </button>
        </div>
      </div>
    );
  }

  scanQR() {
    window.cordova.plugins.barcodeScanner.scan(
      result => {
        if (!result.cancelled) {
          if (result.format == "QR_CODE") {
            var value = result.text;
            window.open(result.text, "_blank", "location=yes");
          }
        }
      },
      error => {
        alert("Scanning failed: " + error);
      }
    );
  }
}

export default Test;

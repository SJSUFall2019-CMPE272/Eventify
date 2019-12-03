// src/models/OwnerSchemas.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VendorSchema = new Schema(
  {
	organizer_id: {
      type: String,
      required: true
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: String,
    company_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone_num: String,
    rfid_reader_id: {
      type: String,
      required: true
    },
	  vendor_type: {
      type: String,
      required: true
    },
    vendor_desc: String,
    rfid_reader_id: {
      type: String,
      required: true
    }
  },
  { collection: "vendors" }
);
module.exports = Vendor = mongoose.model("Vendor", VendorSchema);

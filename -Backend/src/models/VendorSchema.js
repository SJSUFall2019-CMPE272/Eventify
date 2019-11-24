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
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone_num: String,
    rfid_reader_id: String,
	vendor_type: String,
	vendor_desc: String
  },
  { collection: "vendors" }
);
module.exports = Vendor = mongoose.model("Vendor", VendorSchema);

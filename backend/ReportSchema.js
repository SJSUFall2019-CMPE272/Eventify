// src/models/OwnerSchemas.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReportSchema = new Schema(
  {
    vendor_id: Number,
    organizer_id: String,
    company_name: String,
    vendor_type: String,
    visitors: [
      {
        card_number: String,
        total_time: Number
      }
    ]
  },
  { collection: "report" }
);
module.exports = Report = mongoose.model("Report", ReportSchema);

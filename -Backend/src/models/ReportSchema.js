// src/models/OwnerSchemas.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReportSchema = new Schema(
  {
    organizer_id:String,
    vendor_id: Number,
    company_name:String,
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

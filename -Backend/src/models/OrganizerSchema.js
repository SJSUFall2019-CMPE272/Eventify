// src/models/userSchemas.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrganizerSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: String,
    password: {
      type: String,
      required: true
    },
    phone_num: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
	event_name: {
    type: String,
    required: true
  },
	event_desc: String,
	event_date: {
    type: Date,
    required: true
  },
	event_location: {
    type: String,
    required: true
  },
	type: String
  },
  { collection: "organizer" }
);
module.exports = Organizer = mongoose.model("Organizer", OrganizerSchema);

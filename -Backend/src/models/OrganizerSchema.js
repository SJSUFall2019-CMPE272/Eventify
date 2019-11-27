// src/models/userSchemas.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrganizerSchema = new Schema(
  {
    first_name: String,
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
	event_name: String,
	event_desc: String,
	event_date: Date,
	event_location: String,
	type: String
  },
  { collection: "organizer" }
);
module.exports = Organizer = mongoose.model("Organizer", OrganizerSchema);

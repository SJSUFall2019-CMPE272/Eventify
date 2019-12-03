// src/models/OwnerSchemas.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
	organizer_id: {
      type: String,
      required: true
    },
    event_name: {
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
    password: {
      type: String,
      required: true
    },
    phone_num: String,
    rfid_id: {
      type: Number,
      required: true
    },
  },
  { collection: "users" }
);
module.exports = User = mongoose.model("User", UserSchema);

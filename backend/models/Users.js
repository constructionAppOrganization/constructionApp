const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: { type: String },
  email: { type: String },
  contactNo: { type: String },
  nic: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  password: { type: String },
});

const User = mongoose.model("user", usersSchema);

module.exports = User;

const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isActivated: { type: Boolean, default: false, require: false },
  activationLink: { type: String },
});

module.exports = model("User", UserSchema);

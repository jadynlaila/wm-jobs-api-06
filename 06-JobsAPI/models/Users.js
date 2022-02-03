const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "must provide an email"],
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    required: [true, "must provide a password"],
    minLength: 6,
  },
}).pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
    next();
})

usersSchema.methods.comparePassword = async function(submittedPassword) {
    const isMatch = await bcrypt.compare(submittedPassword, this.password);
    return isMatch;
}

usersSchema.methods.createJWT = function () {
    return jwt.sign(
        {userID: this._id, name: this.name},
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )
};
//can do more than one pre

module.exports = mongoose.model("User", usersSchema);

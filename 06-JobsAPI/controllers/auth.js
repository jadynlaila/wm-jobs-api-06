const User = require("../models/Users");
const Jobs = require("../models/Jobs");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { BadRequestError, UnauthError } = require("../errors");

const register = async (req, res) => {
  
  const newUser = await User.create(req.body);
  const token = newUser.createJWT();
  
  res.json({ user: {name: newUser.name}, token});
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    throw new BadRequestError('Please provide a username and password')
  }
  const userLogin = await User.findOne({email});

  if(!userLogin){
    throw new UnauthError('Invalid credentials');
  }

  const isPasswordCorrect = await userLogin.comparePassword(password);

  // console.log(isPasswordCorrect)
  console.log(password)

  if(!isPasswordCorrect){
    throw new UnauthError('Invalid credentials')
  }

  const token = userLogin.createJWT()
  res.json({ user: {name: userLogin.name}, token});
};

module.exports = { login, register };

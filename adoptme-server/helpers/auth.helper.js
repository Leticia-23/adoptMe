const User = require("../models/users");
const Institution = require("../models/institutions");

const signup_helper = async (username, email, password) => {
  const user = new User({
    username: username,
    email: email,
    password: password,
  });
  // Other fields created by deafult in the model

  return await User.create(user);
};

const signup_institution_helper = async (name, email, password) => {
  const institution = new Institution({
    name: name,
    email: email,
    password: password,
  });
  // Other fields created by deafult in the model

  return await Institution.create(institution);
};

const createAdmin_heper = async (username, email, password) => {
  const date = new Date().getTime();

  const user = new User({
    username: username,
    email: email,
    password: password,
    role: "admin",
  });
  // Other fields created by deafult in the model

  return await User.create(user);
};

module.exports = {
  signup_helper,
  createAdmin_heper,
  signup_institution_helper,
};

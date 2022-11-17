const User = require("../models/users");

const findUserByEmail = async (email) => {
  try {
    const res = await User.findOne({ email: email, enabled: true });
    return {
      data: res,
      err: null,
    };
  } catch (error) {
    return {
      err: err,
    };
  }
};

const findUserById = async (id) => {
  try {
    const res = await User.findOne({ _id: id, enabled: true });
    return {
      data: res,
      err: null,
    };
  } catch (error) {
    return {
      err: error,
    };
  }
};

const deleteUserById = async (id) => {
  console.log("deleteUserById helper");
  try {
    const res = await User.findByIdAndUpdate(id, { enabled: false });
    return {
      data: res,
      err: null,
    };
  } catch (error) {
    return {
      err: error,
    };
  }
};

module.exports = { findUserByEmail, findUserById, deleteUserById };

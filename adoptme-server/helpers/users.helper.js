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
  try {
    // With condition that user is not administrator
    const res = await User.findOneAndUpdate(
      { _id: id, role: "user", enabled: true },
      { enabled: false }
    );
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

const getUsersHelper = async () => {
  try {
    const res = await User.find(
      { role: "user", enabled: true },
      "username email biography avatar"
    ).exec();
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

const updateUserById = async (id, updates) => {
  try {
    const res = await User.findByIdAndUpdate(id, updates);
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

module.exports = {
  findUserByEmail,
  findUserById,
  deleteUserById,
  getUsersHelper,
  updateUserById,
};

const Institution = require("../models/institutions");

const findInstitutionByEmail = async (email) => {
  try {
    const res = await Institution.findOne({ email: email, enabled: true });
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

const deleteInsitutionById = async (id) => {
  try {
    // With condition that user is not administrator
    const res = await Institution.findOneAndUpdate(
      { _id: id, enabled: true },
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

module.exports = { findInstitutionByEmail, deleteInsitutionById };

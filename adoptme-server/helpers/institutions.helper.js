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

const findInstitutionById = async (id) => {
  try {
    const res = await Institution.findOne({ _id: id, enabled: true });
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

const getInstitutionsHelper = async () => {
  try {
    const res = await Institution.find(
      { enabled: true },
      "name email web_URL phoneNumber information avatar createdAt"
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

const updateInstitutionById = async (id, updates) => {
  try {
    const res = await Institution.findByIdAndUpdate(id, updates);
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
  findInstitutionByEmail,
  deleteInsitutionById,
  findInstitutionById,
  getInstitutionsHelper,
  updateInstitutionById,
};

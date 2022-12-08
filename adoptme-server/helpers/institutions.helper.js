const Institution = require("../models/institutions");
const Animal = require("../models/animals");

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
      "name information avatar createdAt"
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

const findInstituionAnimals = async (id) => {
  try {
    // Response only public info for the list
    const res = await Animal.find(
      { institution: id },
      "animal_name photo description createdAt"
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

const findUser = async (idInstitution, idAnimal) => {
  try {
    const res = await Animal.findOne(
      {
        _id: idAnimal,
        institution: idInstitution,
        enabled: true,
      },
      "user"
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

module.exports = {
  findInstitutionByEmail,
  deleteInsitutionById,
  findInstitutionById,
  getInstitutionsHelper,
  updateInstitutionById,
  findInstituionAnimals,
  findUser,
};

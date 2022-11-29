const Animal = require("../models/animals");

const findAnimalById = async (id) => {
  try {
    const res = await Animal.findOne({ _id: id, enabled: true });
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

const registerAnimalHelper = async (animal) => {
  const new_animal = new Animal({
    animal_name: animal.animal_name,
    specie: animal.specie,
    breed: animal.breed,
    sex: animal.sex,
    photo: animal.photo,
    description: animal.description,
    institution: animal.institution,
  });
  // Other fields created by deafult in the model or empty

  return await Animal.create(new_animal);
};

const updateAnimalById = async (id, updates) => {
  try {
    const res = await Animal.findByIdAndUpdate(id, updates);
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

const deleteAnimalById = async (id) => {
  try {
    // With condition that user is not administrator
    const res = await Animal.findOneAndUpdate(
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

const getListHelper = async () => {
  try {
    const res = await Animal.find(
      { enabled: true, adopted: false },
      "animal_name photo description"
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

const getListAdoptedHelper = async () => {
  try {
    const res = await Animal.find(
      { enabled: true, adopted: true },
      "animal_name photo description"
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
  findAnimalById,
  registerAnimalHelper,
  updateAnimalById,
  deleteAnimalById,
  getListHelper,
  getListAdoptedHelper,
};

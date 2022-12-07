const institutionHelper = require("../helpers/institutions.helper");
const bcrypt = require("bcrypt");

// Public

const getInstitution = async (req, res) => {
  const { id } = req.params;
  let institution = null;

  try {
    const { data, err } = await institutionHelper.findInstitutionById(id);
    institution = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!institution) {
      return res
        .status(404)
        .json({ error: "It's not possible find the institution" });
    }
    return res.status(200).json({
      id: institution._id,
      name: institution.name,
      email: institution.email,
      web_URL: institution.web_URL,
      phoneNumber: institution.phoneNumber,
      information: institution.information,
      avatar: institution.avatar,
      createdAt: institution.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getInstitutions = async (req, res) => {
  let institutions = null;
  try {
    const { data, err } = await institutionHelper.getInstitutionsHelper();
    institutions = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!institutions) {
      return res.status(404).json({
        error: "Institutions not find",
      });
    }
    return res.status(200).json({ institutions: institutions });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Private

const updateInstitution = async (req, res) => {
  // TODO: upload photo
  let updates = req.body;
  const id = updates.id;
  delete updates.id;
  let institution = null;

  // Check if name is a field to update
  if (updates.new_name) {
    updates.name = updates.new_name;
    delete updates.new_name;
  } else {
    delete updates.name;
  }

  // Check if password is a field to update
  if (updates.password) {
    // Generate a Salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    const hashed_password = await bcrypt.hash(updates.password, salt);

    updates.password = hashed_password;
  }

  try {
    const { data, err } = await institutionHelper.updateInstitutionById(
      id,
      updates
    );
    institution = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!institution) {
      return res
        .status(404)
        .json({ error: "It's not possible find the institution" });
    }

    return res.status(200).json("Institution correclty updated");
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getInstitutionInfo = async (req, res) => {
  const { id } = req.body;
  let institution = null;

  try {
    const { data, err } = await institutionHelper.findInstitutionById(id);
    institution = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!institution) {
      return res
        .status(404)
        .json({ error: "It's not possible find the institution" });
    }

    return res.status(200).json({
      id: institution._id,
      name: institution.name,
      email: institution.email,
      web_URL: institution.web_URL,
      phoneNumber: institution.phoneNumber,
      information: institution.information,
      avatar: institution.avatar,
      createdAt: institution.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const banInstitution = async (req, res) => {
  const { id } = req.params;
  let institution = null;
  try {
    const { data, err } = await institutionHelper.deleteInsitutionById(id);
    institution = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!institution) {
      return res
        .status(404)
        .json({ error: "It's not possible find the institution" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getAnimals = async (req, res) => {
  const { id } = req.params;
  let animals = null;
  try {
    const { data, err } = await institutionHelper.findInstituionAnimals(id);
    animals = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!animals) {
      return res.status(404).json({
        error: "Animals of institution not found",
      });
    }
    return res.status(200).json({ animals: animals });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getUser = async (req, res) => {
  const idInsitution = req.params.idInst;
  const idAnimal = req.params.idAnim;
  let user = null;
  try {
    const { data, err } = await institutionHelper.findUser(
      idInsitution,
      idAnimal
    );
    user = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!user) {
      return res.status(404).json({
        error: "User who adopted this animal not found.",
      });
    }
    return res.status(200).json({ user: user.user });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getInstitution,
  getInstitutions,
  updateInstitution,
  getInstitutionInfo,
  banInstitution,
  getAnimals,
  getUser,
};

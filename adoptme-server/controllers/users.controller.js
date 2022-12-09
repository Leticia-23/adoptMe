const userHelper = require("../helpers/users.helper");
const bcrypt = require("bcrypt");

// Public

const getUser = async (req, res) => {
  const { id } = req.params;
  let user = null;

  try {
    const { data, err } = await userHelper.findUserById(id);
    user = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!user) {
      return res.status(404).json({ error: "It's not possible find the user" });
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      biography: user.biography,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Private

// TODO: upload photo
const updateProfile = async (req, res) => {
  let updates = req.body;
  const id = updates.id;
  delete updates.id;
  let user = null;

  // Check if each field is empty ("") to delete for the patch request
  if (updates.new_name === "") {
    //There isn't new name
    delete updates.name;
    delete updates.new_name;
  } else {
    // There is a new name
    updates.name = updates.new_name;
    delete updates.new_name;
  }

  if (updates.biography === "") {
    delete updates.biography;
  }

  if (updates.avatar === "") {
    delete updates.avatar;
  }

  // Check if password is a field to update
  if (updates.actual_password && updates.password && updates.repeatPassword) {
    // Search the user to check actual password
    const { data, err } = await userHelper.findUserById(id);
    user = data;

    if (err != null) {
      console.log("yyyyy");
      return res.status(400).json({ error: err });
    }

    // Check password
    const validPassword = await bcrypt.compare(
      updates.actual_password,
      user.password
    );

    if (!validPassword) {
      console.log("there");
      return res.status(400).json({ error: "Actual password not valid" });
    }

    // Check passwords
    if (updates.password !== updates.repeatPassword) {
      console.log("here");
      return res.status(400).json({ error: "New passwords don't match" });
    }

    // Generate a Salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    const hashed_password = await bcrypt.hash(updates.password, salt);

    updates.password = hashed_password;
  } else {
    delete updates.actual_password;
    delete updates.password;
    delete updates.repeatPassword;
  }

  try {
    const { data, err } = await userHelper.updateUserById(id, updates);
    user = data;

    if (err != null) {
      console.log("hhhh");
      console.log(err);
      // TODO: decidir si poner que el error es que el nombre ya existe y está duplicado
      return res.status(400).json({ error: err });
    }

    if (!user) {
      return res.status(404).json({ error: "It's not possible find the user" });
    }

    return res.status(200).json("Profile correclty updated");
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const deleteOwnUser = async (req, res) => {
  const { id } = req.body;
  let user = null;

  try {
    const { data, err } = await userHelper.deleteUserById(id);
    user = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!user) {
      return res.status(404).json({ error: "It's not possible find the user" });
    }
    return res.status(204).json("Delete own user correctly");
  } catch (error) {
    return res.status(500).send(error);
  }
};

const banUser = async (req, res) => {
  const { id } = req.params;
  let user = null;
  try {
    const { data, err } = await userHelper.deleteUserById(id);
    user = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!user) {
      return res.status(404).json({
        error: "It's not possible find the user or the user is administrator",
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getUsers = async (req, res) => {
  let users = null;
  try {
    const { data, err } = await userHelper.getUsersHelper();
    users = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!users) {
      return res.status(404).json({
        error: "Users not find",
      });
    }
    return res.status(200).json({ users: users });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getOwnInfo = async (req, res) => {
  const { id } = req.body;
  let user = null;

  try {
    const { data, err } = await userHelper.findUserById(id);
    user = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!user) {
      return res.status(404).json({ error: "It's not possible find the user" });
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      biography: user.biography,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  getUser,
  updateProfile,
  deleteOwnUser,
  banUser,
  getUsers,
  getOwnInfo,
};

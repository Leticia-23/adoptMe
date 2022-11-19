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
      username: user.username,
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

const updateProfile = async (req, res) => {
  let updates = req.body;
  const id = updates.id;
  delete updates.id;
  let user = null;

  // Check if username is a field to update
  if (updates.new_username) {
    updates.username = updates.new_username;
    delete updates.new_username;
  } else {
    delete updates.username;
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
    const { data, err } = await userHelper.updateUserById(id, updates);
    user = data;

    if (err != null) {
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
      return res
        .status(404)
        .json({ error: "It's not possible find the user or the user" });
    }

    return res.status(200).json({
      id: user._id,
      username: user.username,
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

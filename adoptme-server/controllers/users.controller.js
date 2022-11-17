const userHelper = require("../helpers/users.helper");

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
      return res
        .status(404)
        .json({ error: "It's not possible find the user or the user" });
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
  return res.status(200).json("Update profile correctly");
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
  return res.status(200).json("Get all users correctly");
};

const getOwnInfo = async (req, res) => {
  return res.status(200).json("Get own information correctly");
};

const getAssociationInfo = async (req, res) => {
  return res.status(200).json("Get association private information correctly");
};

module.exports = {
  getUser,
  updateProfile,
  deleteOwnUser,
  banUser,
  getUsers,
  getOwnInfo,
  getAssociationInfo,
};

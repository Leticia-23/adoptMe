const jwt = require("jsonwebtoken");
const userHelper = require("../helpers/users.helper");

// Middleware to validate token (private routes)
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader === "undefined") {
    return res.status(401).send({ message: "Token needed" });
  }

  // Extract token
  let accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, process.env.TOKEN_SECRET);

    // Add to the request body the decodificated values
    req.body = { ...req.body, username: decoded.username, id: decoded.id };
    req.user = { id: decoded.id };

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware to validate admin user
const isAdmin = async (req, res, next) => {
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

    if (user.role === "admin") {
      return next();
    }

    return res.status(403).send({ error: "Administrator role is required" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = { verifyToken, isAdmin };

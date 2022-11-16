const jwt = require("jsonwebtoken");

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

    // Add to the body the decodificated values
    req.body = { ...req.body, username: decoded.username, id: decoded.id };
    req.user = { id: decoded.id };

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { verifyToken };

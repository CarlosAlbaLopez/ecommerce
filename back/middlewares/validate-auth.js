"use strict";

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function validateAuth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      const error = new Error("Authorization required");
      error.status = 403;
      throw error;
    }
    const accesToken = authorization.split(" ")[1];

    const payload = jwt.verify(accesToken, JWT_SECRET);
    const { id, name } = payload;

    req.auth = { id, name };

    next();
  } catch (err) {
    res.status(401);
    res.send(err.message);
  }
}

module.exports = validateAuth;

"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const usersRepository = require("../../repositories/users-repository");
// const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
});

async function loginUser(req, res) {
  try {
    await schema.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await usersRepository.findUserByEmail(email);
    if (!user) {
      const error = new Error("No existe un usuario registrado para ese email");
      error.code = 401;
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const error = new Error("La contraseña es incorrecta");
      error.code = 401;
      throw error;
    }

    const secret = process.env.JWT_SECRET;
    const {id, userName, name, lastName, city} = user;
    const jwtTokenExpiration = "365d";
    const payload = {
      id,
      userName,
      name,
      lastName,
      city,
      email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

    const response = {
      accesToken: token,
      expiresIn: jwtTokenExpiration,
    };

    res.send(response);
  } catch (err) {
    // createJsonError(err, res);
  }
}

module.exports = loginUser;

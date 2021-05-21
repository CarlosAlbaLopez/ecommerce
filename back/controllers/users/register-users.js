"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const usersRepository = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");
// const cryptoRandomString = require("crypto-random-string");

const schema = Joi.object().keys({
  userName: Joi.string().alphanum().min(3).max(20).required(),
  name: Joi.string().alphanum().min(3).max(20).required(),
  lastName: Joi.string().alphanum().min(3).max(20).required(),
  city: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
  repeatPassword: Joi.ref("password"),
});

async function registerUsers(req, res) {
  try {
    await schema.validateAsync(req.body);

    const { userName, name, lastName, password, city, email } = req.body;
    const existUser = await usersRepository.findUserByEmail(email);
    if (existUser) {
      const error = new Error("Ya existe un usuario con este email");
      error.status = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const id = await usersRepository.createUser(
      userName,
      name,
      lastName,
      passwordHash,
      city,
      email
    );
    // const verificationCode = cryptoRandomString({ length: 64 });

    // await sendEmailRegistration(name, email, verificationCode);
    // await usersRepository.addVerificationCode(id, verificationCode);

    res.status(201).send("Usuario registrado");
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = registerUsers;

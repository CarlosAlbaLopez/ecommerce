"use strict";

const Joi = require("joi");
const database = require("../infrastructure/database");

async function findUserByEmail(email) {
  const pool = await database.getPool();
  const query = "SELECT * FROM usuarios WHERE email = ?";

  const [usuarios] = await pool.query(query, email);

  return usuarios[0];
}

async function createUser(userName, name, lastName, passwordHash, city, email) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO usuarios (nombreUsuario, nombre, apellidos, contrasenha, localidad, email) VALUES (?,?,?,?,?,?)";
  const [created] = await pool.query(insertQuery, [
    userName,
    name,
    lastName,
    passwordHash,
    city,
    email,
  ]);

  console.log(insertQuery);
  console.log(created.insertId);

  return created.insertId;
}

module.exports = {
  createUser,
  findUserByEmail,
};

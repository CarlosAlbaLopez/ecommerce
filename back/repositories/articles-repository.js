"use strict";

const database = require("../infrastructure/database");

async function create(userId, subcategoryId, title, description, location, price) {
  const pool = await database.getPool();
  const query = `INSERT INTO articulos (id_usuario, id_subcategoria, titulo, descripcion, localizacion, precio) VALUES (?, ?, ?, ?, ?, ?)`;
  const [newArticle] = await pool.query(query, [userId, subcategoryId, title, description, location, price]);

  return newArticle.insertId;
}

async function findAll() {
  const pool = await database.getPool();
  const query = "SELECT * FROM articulos";
  const [articles] = await pool.query(query);

  return articles;
}

// async function findByCategoryAndSubcategory(category, subcategory) {
//   const pool = await database.getPool();
//   const query = "SELECT * FROM articles WHERE categoria = ? AND subcategoria = ?";
//   const [articles] = await pool.query(query, [category, subcategory]);

//   return articles[0];
// }

async function findById(id) {
  const pool = await database.getPool();
  const query = `SELECT * FROM articulos WHERE id=${id}`;
  const [articles] = await pool.query(query);

  return articles;
}

// async function removeById(id) {
//   const pool = await database.getPool();
//   const query = `DELETE FROM articles WHERE id=${id}`;
//   const [articles] = await pool.query(query);

//   return articles;
// }

// async function updateById(id, updatedCar) {
//   const { brand, model, year } = updatedCar;
//   const pool = await database.getPool();
//   const updateQuery =
//     "UPDATE articles SET brand = ?, model = ?, year = ? WHERE id = ?";
//   await pool.query(updateQuery, [brand, model, year, id]);

//   return true;
// }

module.exports = {
  create,
  findAll,
//   findByCategoryAndSubcategory,
  findById,
//   removeById,
//   updateById,
};

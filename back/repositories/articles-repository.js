"use strict";

const database = require("../infrastructure/database");

async function create(
  userId,
  subcategoryId,
  title,
  description,
  location,
  price
) {
  const pool = await database.getPool();
  const query = `INSERT INTO articulos (id_usuario, id_subcategoria, titulo, descripcion, localizacion, precio) VALUES (?, ?, ?, ?, ?, ?)`;
  const [newArticle] = await pool.query(query, [
    userId,
    subcategoryId,
    title,
    description,
    location,
    price,
  ]);

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

async function removeById(id) {
  const pool = await database.getPool();
  const query = `DELETE FROM articulos WHERE id=${id}`;
  const [articles] = await pool.query(query);

  return articles;
}

async function updateById(id, updatedArticle) {
  const { subcategoryId, title, description, location, price } = updatedArticle;
  const pool = await database.getPool();
  const updateQuery =
    "UPDATE articulos SET id_subcategoria = ?, titulo = ?, descripcion = ?, localizacion = ?, precio = ? WHERE id = ?";
  await pool.query(updateQuery, [
    subcategoryId,
    title,
    description,
    location,
    price,
    id,
  ]);

  return true;
}

module.exports = {
  create,
  findAll,
  //   findByCategoryAndSubcategory,
  findById,
  removeById,
  updateById,
};

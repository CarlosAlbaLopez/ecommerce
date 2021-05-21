"use strict";

const { removeById } = require("../../repositories/articles-repository");
const { findAll } = require("../../repositories/articles-repository");
const { findById } = require("../../repositories/articles-repository");

async function deleteArticle(req, res) {
  try {
    // if (req.auth.role !== "admin") {
    //   const error = new Error("No tienes permiso...");
    //   error.status = 401;
    //   throw error;
    // }
    const { id } = req.params;

    // Consultamos que el id del usuario coincide con el id_usuario del artículo para que solamente
    // pueda eliminar sus propios artículos
    const userId = req.auth.id;
    const article = await findById(parseInt(id));
    if (article[0].id_usuario !== userId) {
      const error = new Error("No tienes permiso...");
      error.status = 401;
      throw error;
    }

    removeById(parseInt(id));

    const articles = await findAll();

    //res.status(204).send(); // No content
    res.status(200).send(articles);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }

    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = deleteArticle;

"use strict";

const Joi = require("joi");
const {
  findById,
  updateById,
} = require("../../repositories/articles-repository");
const createJsonError = require("../errors/create-json-errors");

const schemaId = Joi.number().positive().required();

const schema = Joi.object().keys({
  subcategoryId: Joi.number().min(1).required(),
  title: Joi.string().alphanum().min(2).max(50).required(),
  description: Joi.string().min(2).max(250),
  location: Joi.string().alphanum().min(2).max(100).required(),
  price: Joi.number().precision(2).required(),
});

async function updateArticle(req, res) {
  try {
    // if (req.auth.role !== "admin") {
    //   const error = new Error("No tienes permiso...");
    //   error.status = 401;
    //   throw error;
    // }
    const { id } = req.params;

    // 1. Validamos el parametro id
    await schemaId.validateAsync(id);

    // 2. Validamos que existe el coche
    const article = await findById(parseInt(id));
    if (!article) {
      const error = new Error("Id not available");
      error.status = 400;
      throw error;
    }

    // 3. Validamos el body que nos envian
    await schema.validateAsync(req.body);

    const { subcategoryId, title, description, location, price } = req.body;

    // 4. Actualizamos el artículo
    const updatedArticle = {
      subcategoryId,
      title,
      description,
      location,
      price,
    };
    await updateById(parseInt(id), updatedArticle);

    res
      .status(200)
      .send({ id, subcategoryId, title, description, location, price });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateArticle;

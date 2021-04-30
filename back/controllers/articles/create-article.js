"use strict";

const Joi = require("joi");
const articlesRepository = require("../../repositories/articles-repository");

const schema = Joi.object().keys({
  subcategoryId: Joi.number().min(1).required(),
  title: Joi.string().alphanum().min(2).max(50).required(),
  description: Joi.string().alphanum().min(2).max(250),
  location: Joi.string().alphanum().min(2).max(100).required(),
  price: Joi.number().precision(2).required(),
});

async function createArticle(req, res) {
  try {
    // if (req.auth.role !== "admin") {
    //   const error = new Error("No tienes permiso...");
    //   error.status = 401;
    //   throw error;
    // }
    await schema.validateAsync(req.body);
    Joi.assert(req.body, schema);

    const userId = req.auth.id;

    const { subcategoryId, title, description, location, price } = req.body;
    const addedArticle = await articlesRepository.create(userId, subcategoryId, title, description, location, price);
    res.status(201).send( {addedArticle} );
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }

    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = createArticle;

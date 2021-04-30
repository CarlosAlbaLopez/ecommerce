"use strict";
const Joi = require("joi");
const { findById } = require("../../repositories/articles-repository");

const schema = Joi.number().positive().required();

async function getArticleById(req, res) {
  try {
    const { id } = req.params;
    Joi.assert(id, schema);
    const article = await findById(parseInt(id));

    if (!article) {
      throw new Error("Id not available");
      //res.status(400).send('Id not available');
    }

    //res.status(200).send(article);
    res.send(article);
  } catch (err) {
    res.status(400).send({ error: err.message });
    //res.status(400).send(err);
  }
}

module.exports = getArticleById;

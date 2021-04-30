"use strict";
const articlesRepository = require("../../repositories/articles-repository");

async function getArticles(req, res) {
  const articles = await articlesRepository.findAll();

  res.send(articles);
}

module.exports = getArticles;

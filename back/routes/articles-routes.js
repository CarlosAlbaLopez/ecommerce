"use strict";

const express = require("express");
const createArticle = require("../controllers/articles/create-article");
// const deleteArticleById = require("../controllers/articles/delete-article-by-id");
const getArticleById = require("../controllers/articles/get-article-by-id");
const getArticles = require("../controllers/articles/get-articles");
// const patchArticleById = require("../controllers/articles/path-article-by-id");
// const updateArticleById = require("../controllers/articles/update-article-by-id");

const validateAuth = require("../middlewares/validate-auth");

const router = express.Router();

// Públicas
router.route("/").get((req, res) => getArticles(req, res));
router.route("/:id").get((req, res) => getArticleById(req, res));

// Privadas
router
  .route("/")
  .all(validateAuth)
  .post((req, res) => createArticle(req, res));
router
  .route("/:id")
  .all(validateAuth)
  .delete((req, res) => deleteArticleById(req, res))
  .put((req, res) => updateArticleById(req, res))
  .patch((req, res) => patchArticleById(req, res));

module.exports = router;

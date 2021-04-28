"use strict";

const express = require("express");
const registerUsers = require("../controllers/users/register-users");
const loginUsers = require("../controllers/users/login-users");

const router = express.Router();

//api/v1/users
router.route("/register").post((req, res) => registerUsers(req, res));
router.route("/login").post((req, res) => loginUsers(req, res));

module.exports = router;

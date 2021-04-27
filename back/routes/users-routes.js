"use strict";

const express = require("express");
const registerUsers = require("../controllers/users/register-users");
// const loginUser = require("../controllers/users/login-user");

const router = express.Router();

//api/v1/users
router.route("/register").post((req, res) => registerUsers(req, res));
router.route("/login").post((req, res) => loginUser(req, res));

module.exports = router;

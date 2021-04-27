"use strict";

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());

// const articlesRouter = require("./app/routes/articles-routes");
const usersRouter = require("./routes/users-routes");

const port = process.env.SERVER_PORT || 3080;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
// app.use("/api/v1/articles/", articlesRouter);
app.use("/api/v1/users/", usersRouter);

app.listen(port, () => console.log(`Listening ${port}...`));

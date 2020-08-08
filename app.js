"use strict";
const path = require("path");
const postsController = require("./postsController");

const express = require("express");

const app = express();
app.disable("x-powered-by");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.locals.siteName = "Dev Simple";
    res.locals.url = "https://jzsgku7hoi.execute-api.eu-west-2.amazonaws.com";
    next();
});

// Routes
app.get("/", postsController.getPosts);
app.get("/posts", postsController.getPosts);
app.get("/posts/:id", postsController.getPost);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Serverless Error");
});

app.use(function notFound(req, res) {
    res.status(404).send("<h1 style='text-align:center'>Page not Found</h1>");
});

module.exports = app;

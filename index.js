const express = require("express");

const app = express();

const path = require('path');

const ejs = require("ejs");

const body = require("body-parser");

const methodOverride = require("method-override");

const publicFolder = path.join(__dirname,"public");

app.set("view engine", "ejs");

app.use(express.static(publicFolder));

app.use(body.urlencoded({extended: true}));

app.use(methodOverride('_method'));


const taskRouter = require("./routes/taskRoutes");

app.get("*" (req,res) => res.redirect("/task") );

app.use("/task",taskRouter);

app.listen(3000);
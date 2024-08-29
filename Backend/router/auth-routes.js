const express = require("express");
const app = express();
const auth = require("../controller/auth-controller")



app.post("/register", auth.registerUser);

app.post("/login", auth.login)

app.get("/login", auth.getLogin)


module.exports = app;
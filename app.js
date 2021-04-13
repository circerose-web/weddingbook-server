require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const User = require("./controllers/userController");
const Blog = require("./controllers/blogController");
const Guest = require("./controllers/guestController");

sequelize.sync();
app.use(require("./middleware/headers"));
app.use(express.json());

app.use("/user", User);
app.use("/blog", Blog);
app.use("/guest", Guest);

app.listen(3000, function () {
  console.log("Wedding Book server is listening on port 3000");
});

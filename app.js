require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const User = require("./controllers/userController");
const Blog = require("./controllers/blogControllers");
const Guest = require("./controllers/guestControllers");

sequelize.sync();
app.use(require("./middleware/headers"));
app.use(express.json());

app.use("/user", User);
app.use("/blog", Blog);
app.use("/guest", Guest);

app.listen(process.env.PORT, function () {
  console.log("Wedding Book server is listening on port 3000");
});

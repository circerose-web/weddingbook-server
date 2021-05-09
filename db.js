const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

sequelize.authenticate().then(
  function () {
    console.log("Connected to weddingbook database");
  },
  function (err) {
    console.log(err);
  }
);

const User = sequelize.import("./models/user");
const Blog = sequelize.import("./models/blog");
const Guest = sequelize.import("./models/guest");

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(Guest);
Guest.belongsTo(User);

module.exports = sequelize;

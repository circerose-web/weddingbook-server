require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");

let podcast = require("./controllers/wedding");
let user = require("./controllers/usercontroller");

sequelize.sync();
// sequelize.sync({force: true})
app.use(require("./middleware/headers"));

// app.options('*', (req, res) => {
//     res.json({
//       status: 'OK'
//     });
//   });
app.use(express.json());

app.use("/user", user);
app.use("/wedding", wedding);

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});

// app.listen(process.env.PORT, () => {
//     console.log(`server is listening on port ${process.env.PORT}`)
// })

require("dotenv").config();
const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/***************************
 * USER REGISTER *
 ****************************/
// router.post("/register", (req, res) => {
//   User.create({
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 13),
//   })
//     .then((user) => {
//       let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//         expiresIn: 60 * 60 * 24,
//       });

//       res.status(200).json({
//         user: user,
//         message: "User is now registered.",
//         sessionToken: token,
//       });
//     })
//     (createError = (err) => res.send(500, err))
//     // .catch((err) => {
//     //   res.status(500).json({
//     //     error: "Register did not work.",
//     //   });
//     // });
// });

router.post("/register", (req, res) => {
  console.log(req.body);
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  }).then(
    (createSuccess = (user) => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        user: user,
        message: "user created",
        sessionToken: token,
      });
    }),
    (createError = (err) => res.send(500, err))
  );
});
/***************************
 * USER LOGIN*
 ****************************/
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user === null) {
        return res.status(404).json({ message: "user not found" });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });

            res.status(200).json({
              user: user,
              message: "User logged in successfully!",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Login Failed" });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "You are not logged in.",
      });
    });
});

module.exports = router;

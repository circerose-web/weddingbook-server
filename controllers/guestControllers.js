const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validateSession");

/************************
 * RECIPE CREATE *
 *************************/
router.post("/", validateSession, (req, res) => {
  const blogEntry = {
    name: req.body.guest.name,
    date: req.body.guest.date,
    activity: req.body.blog.activity,
    thoughts: req.body.blog.thoughts,
  };
  Blog.create(blogEntry)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

/*******************************
 * GET ALL COCKTAILS BY USER *
 ********************************/
router.get("/", validateSession, (req, res) => {
  Blog.findAll({ where: { userId: req.user.id } })
    .then((blogs) => {
      if (blogs.length === 0)
        return res
          .status(200)
          .json({ message: "No blog posts were found! Try creating one." });
      res.status(200).json({ cocktails });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

/*******************************
 * SEARCH COCKTAILS BY NAME *
 ********************************/
router.get("/blog/:name", (req, res) => {
  Blog.findAll({ where: { name: req.params.name } })
    .then((blogs) => {
      if (blogs.length === 0)
        return res
          .status(200)
          .json({ message: "No blog posts were found! Try creating one." });
      res.status(200).json({ cocktails });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

/*******************************
 * UPDATE COCKTAIL RECIPE *
 ********************************/
router.put("/:id", validateSession, (req, res) => {
  const blogUpdate = {
    title: req.body.title,
  };
  Blog.update(blogUpdate, {
    where: { id: req.params.id, userId: req.user.id },
  })
    .then((response) => {
      res
        .status(200)
        .json({ message: "Your blog has been updated.", response });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

/*************************
 * DELETE COCKTAIL *
 **************************/
router.delete("/:id", validateSession, (req, res) => {
  Blog.destroy({ where: { id: req.params.id, userId: req.user.id } })
    .then((result) => {
      if (result) {
        return res
          .status(200)
          .json({ message: `Successfully deleted ${result}` });
      }

      res.json({ message: "Couldn't find specified blog to delete" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;

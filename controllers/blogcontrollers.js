const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validateSession");
const Blog = require("../db").import("../models/blog");

/************************
  BLOG *
 *************************/
router.post("/", validateSession, (req, res) => {
  const blogEntry = {
    title: req.body.title,
    date: req.body.date,
    activity: req.body.activity,
    description: req.body.description,
    thoughts: req.body.thoughts,
    userId: req.user.id,
  };
  Blog.create(blogEntry)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

/*******************************
 * GET ALL BLOGS BY USER *
 ********************************/
router.get("/", validateSession, (req, res) => {
  Blog.findAll({ where: { userId: req.user.id } })
    .then((blogs) => {
      if (blogs.length === 0)
        return res
          .status(200)
          .json({ message: "No blog posts were found! Try creating one." });
      res.status(200).json({ blogs });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

/*******************************
 * SEARCH BLOGS BY NAME *
 ********************************/
router.get("/blog/:name", (req, res) => {
  Blog.findAll({ where: { name: req.params.name } })
    .then((blogs) => {
      if (blogs.length === 0)
        return res
          .status(200)
          .json({ message: "No blog posts were found! Try creating one." });
      res.status(200).json({ blogs });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

/*******************************
 * UPDATE BLOG *
 ********************************/
router.put("/:id", validateSession, (req, res) => {
  const blogUpdate = {
    title: req.body.title,
  };
  Blog.update(req.body, {
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
 * DELETE BLOG *
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

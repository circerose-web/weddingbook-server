const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validateSession");
const Guest = require("../db").import("../models/guest");

router.post("/", validateSession, (req, res) => {
  const guestEntry = {
    name: req.body.name,
    side: req.body.side,
    relation: req.body.relation,
    theirSpouse: req.body.theirSpouse,
    theirKids: req.body.theirKids,
    userId: req.user.id,
  };
  Guest.create(guestEntry)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", validateSession, (req, res) => {
  Guest.findAll({ where: { userId: req.user.id } })
    .then((guests) => {
      if (guests.length === 0)
        return res
          .status(200)
          .json({ message: "No guests were found! Try creating one." });
      res.status(200).json({ guests });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get("/guest/:name", (req, res) => {
  Guest.findAll({ where: { name: req.params.name } })
    .then((guests) => {
      if (guests.length === 0)
        return res
          .status(200)
          .json({ message: "No guest posts were found! Try creating one." });
      res.status(200).json({ guests });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.put("/:id", validateSession, (req, res) => {
  const guestUpdate = {
    title: req.body.title,
  };
  Guest.update(guestUpdate, {
    where: { id: req.params.id, userId: req.user.id },
  })
    .then((response) => {
      res
        .status(200)
        .json({ message: "Your guest has been updated.", response });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/:id", validateSession, (req, res) => {
  Guest.destroy({ where: { id: req.params.id, userId: req.user.id } })
    .then((result) => {
      if (result) {
        return res
          .status(200)
          .json({ message: `Successfully deleted ${result}` });
      }

      res.json({ message: "Couldn't find specified guest to delete" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;

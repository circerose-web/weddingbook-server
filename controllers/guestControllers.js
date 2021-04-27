const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validateSession");

/************************
 * RECIPE CREATE *
 *************************/
router.post("/guest", validateSession, (req, res) => {
  const guestEntry = {
    name: req.guest.name,
    side: req.guest.side,
    relation: req.guest.relation,
    theirSpouse: req.guest.theirSpouse,
    theirKids: req.guest.theirKids,
  };
  Guest.create(guestEntry)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

/*******************************
 * GET ALL COCKTAILS BY USER *
 ********************************/
router.get("/", validateSession, (req, res) => {
  Guest.findAll({ where: { userId: req.user.id } })
    .then((blogs) => {
      if (blogs.length === 0)
        return res
          .status(200)
          .json({ message: "No guests were found! Try creating one." });
      res.status(200).json({ cocktails });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

/*******************************
 * SEARCH COCKTAILS BY NAME *
 ********************************/
router.get("/guest/:name", (req, res) => {
  Guest.findAll({ where: { name: req.params.name } })
    .then((blogs) => {
      if (blogs.length === 0)
        return res
          .status(200)
          .json({ message: "No guest posts were found! Try creating one." });
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

/*************************
 * DELETE COCKTAIL *
 **************************/
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

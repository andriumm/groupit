var express = require("express");
var router = express.Router();
const models = require("../models");

/* GET users listing. */
router.get("/", function (req, res, next) {
  models.Users.findAll()
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

/* GET one user. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  models.Users.findOne({
    where: {
      id,
    },
  })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});
/* POST one user. */
router.post("/", function (req, res, next) {
  const { name, username, email, password } = req.body;
  models.Users.create({ name, username, email, password })
    .then(() => res.send({ message: "new user added succesfully!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

/* PUT one user. */
router.put("/:id", function (req, res, next) {
  const { name, username, email, password } = req.body;
  const { id } = req.params;
  models.Users.update(
    { name, username, email, password },
    {
      where: {
        id,
      },
    }
  )
    .then(() => res.send({ message: "user updated succesfully!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

/* DELETE one user. */
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  models.Users.destroy({
    where: {
      id,
    },
  })
    .then(() => res.send({ message: "user deleted!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;

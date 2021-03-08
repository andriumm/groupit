const models = require("../models");
var express = require("express");
var router = express.Router();

/* GET resources listing. */
router.get("/", function (req, res, next) {
  models.Resources.findAll()
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

/* GET one resource. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  models.Resources.findOne({
    where: {
      id,
    },
  })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});
/* POST one resource. */
router.post("/:user_id/:topic_id", function (req, res, next) {
  console.log("here")
  const { user_id, topic_id } = req.params;
  const {
    resource_name,
    url,
    format,
    subcategory_id,
    priority,
    complete,
    reminder,
    created_date,
  } = req.body;
  models.Resources.create({
    user_id,
    topic_id,
    resource_name,
    url,
    format,
    subcategory_id,
    priority,
    complete,
    reminder,
    created_date,
  })
    .then(() => res.send({ message: "new resource added succesfully!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

/* PUT one resource. */
router.put("/:id", function (req, res, next) {
  const {
    resource_name,
    url,
    format,
    subcategory,
    priority,
    complete,
    reminder,
    created_date,
  } = req.body;
  const { id } = req.params;
  models.Resources.update(
    {
      resource_name,
      url,
      format,
      subcategory,
      priority,
      complete,
      reminder,
      created_date,
    },
    {
      where: {
        id,
      },
    }
  )
    .then(() => res.send({ message: "resource updated succesfully!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

/* DELETE one resource. */

router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  models.Resources.destroy({
    where: {
      id,
    },
  })
    .then(() => res.send({ message: "resource deleted!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;

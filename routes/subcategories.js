const models = require("../models");
var express = require("express");
var router = express.Router();

/* GET Subcategories listings. */
router.get("/", function (req, res, next) {
  models.Subcategories.findAll()
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

/* GET one Subcategory. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  models.Subcategories.findOne({
    where: {
      id,
    },
  })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});
/* POST one Subcategory. */
router.post("/:topic_id", function (req, res, next) {
  const { topic_id } = req.params;
  const { subcategory_name } = req.body;
  models.Subcategories.create({ topic_id, subcategory_name })
    .then(() => res.send({ message: "new Subcategory added succesfully!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

/* PUT one Subcategory. */
router.put("/:id", function (req, res, next) {
  const { topic_id, subcategory_name } = req.body;
  const { id } = req.params;
  models.Subcategories.update(
    {
      subcategory_name,
      topic_id,
    },
    {
      where: {
        id,
      },
    }
  )
    .then(() => res.send({ message: "Subcategories updated succesfully!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

/* DELETE one Subcategory. */

router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  models.Subcategories.destroy({
    where: {
      id,
    },
  })
    .then(() => res.send({ message: "Subcategories deleted!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
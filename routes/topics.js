const models = require("../models");
var express = require("express");
var router = express.Router();

/* GET topics based on parent */

router.get("/", function (req, res, next) {
  
  //const { parent } = req.body;
  
  models.Topics.findAll({

    // where: {
    //   parent,
    // },

  })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

// /* GET all topics and subcategories. */
// router.get("/all", function (req, res, next) {
//   models.Topics.findAll()
//     .then((data) => res.send(data))
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });

/* GET one topic. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  models.Topics.findOne({
    where: {
      id,
    },
  })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});


/* POST one topic. */
router.post("/:user_id", function (req, res, next) {
  const { user_id } = req.params;
  const { topic_name, priority, parent } = req.body;
  models.Topics.create({ user_id, topic_name, priority, parent })
    .then(() => res.send({ message: "new topic added succesfully!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

/* PUT one topic. */
router.put("/:id", function (req, res, next) {
  const { topic_name, priority, parent } = req.body;
  const { id } = req.params;
  models.Topics.update(
    {
      topic_name,
      priority,
      parent,
    },
    {
      where: {
        id,
      },
    }
  )
    .then(() => res.send({ message: "topic updated succesfully!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

/* DELETE one topic. */

router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  models.Topics.destroy({
    where: {
      id,
    },
  })
    .then(() => res.send({ message: "topic deleted!" }))
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;

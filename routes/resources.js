const models = require("../models");
var express = require("express");
var router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const topicShouldExist = require("../guards/topicShouldExist");
const resourceShouldExist = require("../guards/resourceShouldExist");
const topicBelongsToUser = require("../guards/topicBelongsToUser");

const resourceShouldBelongToTopic = require("../guards/resourceShouldBelongToTopic");
/* GET resources listing. */

//we need to take the topic_id into account (trying snippet below)
router.get("/", userShouldBeLoggedIn, function (req, res, next) {
  models.Resources.findAll({
    where: {
      topic_id: topic.id,
    },
  })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});
// router.get("/", userShouldBeLoggedIn, async function (req, res, next) {
// 	const user_id = req.user_id;
// 	try {
// 		const data = await models.Resources.findAll({
// 			where: {
// 				user_id,
// 			},
// 		});
// 		res.send(data);
// 	} catch (error) {
// 		res.status(500).send(error);
// 	}
// });

/* GET one resource. */
router.get(
  "/:id",
  [
    userShouldBeLoggedIn,
    resourceShouldExist,
    // topicShouldExist,
    // topicBelongsToUser,
    resourceShouldBelongToTopic,
  ],
  function (req, res, next) {
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
  }
);
/* POST one resource. */
router.post(
  // "/:topic_id",
  "/",
  userShouldBeLoggedIn,
  function (req, res, next) {
    console.log("here");
    // const { topic_id } = req.params;
    const {
      topic_id,
      resource_name,
      url,
      format,
      priority,
      complete,
      reminder,
      created_date,
    } = req.body;
    models.Resources.create({
      topic_id,
      resource_name,
      url,
      format,
      priority,
      complete,
      reminder,
      created_date,
    })
      .then(() => res.send({ message: "new resource added succesfully!" }))
      .catch((error) => {
        res.status(500).send(error);
      });
  }
);

/* PUT one resource. */
router.put("/:id", userShouldBeLoggedIn, function (req, res, next) {
  const {
    topic_id,
    resource_name,
    url,
    format,
    priority,
    complete,
    reminder,
    created_date,
  } = req.body;
  const { id } = req.params;
  models.Resources.update(
    {
      topic_id,
      resource_name,
      url,
      format,
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

router.delete("/:id", userShouldBeLoggedIn, function (req, res, next) {
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

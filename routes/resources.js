const models = require("../models");
var express = require("express");
var router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const topicShouldExist = require("../guards/topicShouldExist");
const resourceShouldExist = require("../guards/resourceShouldExist");
const topicBelongsToUser = require("../guards/topicBelongsToUser");

const resourceShouldBelongToTopic = require("../guards/resourceShouldBelongToTopic");
/* GET resources listing. */

/* 
  get all resources belonging to one user 
  this returns a nested object  
*/
router.get("/", userShouldBeLoggedIn, async function (req, res, next) {
	const id = req.user_id;
  try {
		const data = await models.Topics.findAll({
			where: {
				user_id : id,
			},
      attributes: ["id"],
      include: {
        model: models.Resources,
      },
		});
		res.send(data);
	} catch (error) {
		res.status(500).send(error);
	}
});

/* get all resources belonging to one topic */
router.get("/user/:id", [userShouldBeLoggedIn, topicBelongsToUser] , async function (req, res, next) {
  const { id } = req.params; // this is the topic ID
  console.log("mimi")
  try {
		const data = await models.Topics.findOne({
			where: {
			  id,
			},
      attributes: ["id"],
      include: {
        model: models.Resources,
      },
		});
		res.send(data);
	} catch (error) {
		res.status(500).send(error);
	}
});

/* GET one resource. */
router.get(
  "/:id", //this is the resource ID
  [
    userShouldBeLoggedIn,
    resourceShouldExist,
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
  "/:id", //this is the topic ID
  [userShouldBeLoggedIn, 
    topicShouldExist,topicBelongsToUser],
  function (req, res, next) {
    const topic_id = req.params.id;
    const {
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
  res.end();
  }
);

router.put("/:id", [
  userShouldBeLoggedIn,
  resourceShouldExist,
  resourceShouldBelongToTopic,
], function (req, res, next) {
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
  const { id } = req.params; //this is the resource ID
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
router.delete("/:id", [userShouldBeLoggedIn,
resourceShouldExist,
resourceShouldBelongToTopic], function (req, res, next) {
  const { id } = req.params; //this is the resource ID
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

const models = require("../models");
var express = require("express");
var router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

/* GET topics based on parent */
router.get("/", userShouldBeLoggedIn, function (req, res, next) {

	console.log("here tada")
	const  user_id  = req.user_id;
	console.log(user_id)
	models.Topics.findAll({
		where: {
			user_id,
		},
	})
		.then((data) => res.send(data))
		.catch((error) => {
			res.status(500).send(error);
		});
});

// This solution does not take the user_id into account
//   models.Topics.findAll({
//     where: {
//       parent: null,
//     },
//     include: {
//       model: models.Topics,
//       as: "Subtopics",
//     },
//   })
//     .then((data) => res.send(data))
//     .catch((error) => {
//       res.status(500).send(error);
//     });


/* GET all topics and subcategories. */
// router.get("/all", userShouldBeLoggedIn, function (req, res, next) {
// 	models.Topics.findAll()
// 		.then((data) => res.send(data))
// 		.catch((error) => {
// 			res.status(500).send(error);
// 		});
// });

/* GET one topic. */
// router.get("/:id", userShouldBeLoggedIn, function (req, res, next) {
//   const { id } = req.params;
//   models.Topics.findOne({
//     where: {
//       id,
//     },
//   })
//     .then((data) => res.send(data))
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });

router.get("/:id", userShouldBeLoggedIn, async function (req, res, next) {
  const { id } = req.params;
  try{
  const data = await models.Topics.findOne({
    where: {
      id,
    },
  });
   res.send(data);
  }catch(error) {
      res.status(500).send(error);
  };
});

/* POST one topic. */
router.post("/", userShouldBeLoggedIn, function (req, res, next) {
 // const user_id = req.user_id;
  const { topic_name } = req.body;
  //const { user_id } = req.params;
  // const { topic_name, priority, parent } = req.body;
  //GERMINAL'S CODE:
  req.user
    .createTopic({ topic_name })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
  // models.Topics.create({ user_id, topic_name, priority, parent })
  //   .then(() => res.send({ message: "new topic added succesfully!" }))
  //   .catch((error) => {
  //     res.status(500).send(error);
  // });
});



/*POST one subtopic.*/
router.post("/:id/subtopics", userShouldBeLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { topic_name } = req.body;
  try {
    const topic = await models.Topics.findOne({
      where: {
        id,
      },
    });
    const subtopic = await topic.createSubtopic({ topic_name });
    res.send(subtopic);
  } catch (error) {
    res.status(500).send(error);
  }
});


/* PUT one topic. */
router.put("/:id", userShouldBeLoggedIn, function (req, res, next) {
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

router.delete("/:id", userShouldBeLoggedIn, function (req, res, next) {
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

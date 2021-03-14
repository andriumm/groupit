const models = require("../models");
var express = require("express");
var router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const topicShouldExist = require("../guards/topicShouldExist");
const topicBelongsToUser = require("../guards/topicBelongsToUser");

/* GET topics based on parent (inlcuding subtopics) */
router.get("/", userShouldBeLoggedIn, async function (req, res, next) {
	const user = req.user;

	try {
		const data = await models.Topics.findAll({
			where: {
				parent: null,
				user_id: user.id,
			},
			include: {
				model: models.Topics,
				as: "Subtopics",
			},
		});

		res.send(data);
	} catch (error) {
		res.status(500).send(error);
	}
});

// /* GET topics parent topics and subtopics for that parent */
// router.get(
// 	"/:id/subtopics",
// 	[userShouldBeLoggedIn, topicShouldExist, topicBelongsToUser],
// 	async function (req, res, next) {
// 		const { id } = req.params;
// 		const user_id = req.user_id;
// 		const { topic_name, priority } = req.body;
		
//     try {
// 			const data = await models.Topics.findOne({
// 				where: {
// 					id,
//           parent
// 				},
//         include: {
//           model: models.Topics,
//           as: "Subtopics",
//         },
// 			});
	
// 			res.send(data);
// 		} catch (error) {
// 			res.status(500).send(error);
// 		}
// 	}
// );

/* GET one topic. */
router.get(
	"/:id",
	[userShouldBeLoggedIn, topicShouldExist, topicBelongsToUser],
	async function (req, res, next) {
		const { id } = req.params;
		try {
			const data = await models.Topics.findOne({
				where: {
					id,
				},
			});
			res.send(data);
		} catch (error) {
			res.status(500).send(error);
		}
	}
);

/* POST one topic. */
router.post("/", userShouldBeLoggedIn, async function (req, res, next) {
	const user_id = req.user_id;
	const { topic_name, priority, parent } = req.body;
	try {
		await models.Topics.create({ user_id, topic_name, priority, parent });
		res.send({ message: "new topic added succesfully!" });
	} catch (error) {
		res.status(500).send(error);
	}
});

/* This endpoint create a new subtopic and associate a subtopic but what we need is to associate only a subtopic with a topic*/
/*POST one subtopic.*/
router.post(
	"/:id/subtopics",
	[userShouldBeLoggedIn, topicShouldExist, topicBelongsToUser],
	async (req, res) => {
		const { id } = req.params;
		const user_id = req.user_id;
		const { topic_name, priority } = req.body;
		try {
			const topic = await models.Topics.findOne({
				where: {
					id,
				},
			});
			await topic.createSubtopic({ user_id, topic_name, priority });
			res.send({ message: "New subtopic added succesfully!" });
		} catch (error) {
			res.status(500).send(error);
		}
	}
);

// /*POST one subtopic.*/
// router.post(
// 	"/:id/subtopics",
// 	[userShouldBeLoggedIn, topicShouldExist, topicBelongsToUser],
// 	async (req, res) => {
// 		const { id } = req.params;
// 		const user_id = req.user_id;
// 		const { topic_name, priority } = req.body;
// 		try {
// 			const topic = await models.Topics.findOne({
// 				where: {
// 					id,
// 				},
// 			});
// 			await topic.createSubtopic({ user_id, topic_name, priority });
// 			res.send({ message: "New subtopic added succesfully!" });
// 		} catch (error) {
// 			res.status(500).send(error);
// 		}
// 	}
// );


/* PUT one topic. */
// router.put(
// 	"/:id",
// 	[userShouldBeLoggedIn, topicShouldExist, topicBelongsToUser],
// 	function (req, res, next) {
// 		const { topic_name, priority, parent } = req.body;
// 		const { id } = req.params;
// 		models.Topics.update(
// 			{
// 				topic_name,
// 				priority,
// 				parent,
// 			},
// 			{
// 				where: {
// 					id,
// 				},
// 			}
// 		)
// 			.then(() => res.send({ message: "topic updated succesfully!" }))
// 			.catch((error) => {
// 				res.status(500).send(error);
// 			});
// 	}
// );

router.put(
	"/:id",
	[userShouldBeLoggedIn, topicShouldExist, topicBelongsToUser],
	async function (req, res, next) {
		const { topic_name, priority, parent } = req.body;
		const { id } = req.params;
		try {
			await models.Topics.update(
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
			);
			res.send({ message: "Topic updated succesfully!" });
		} catch (error) {
			res.status(500).send(error);
		}
	}
);

/* DELETE one topic. */

router.delete(
	"/:id",
	[userShouldBeLoggedIn, topicShouldExist, topicBelongsToUser],
	function (req, res, next) {
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
	}
);

module.exports = router;

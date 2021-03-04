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
		.then((data) => res.send(data))
		.catch((error) => {
			res.status(500).send(error);
		});
});

module.exports = router;

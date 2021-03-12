var express = require("express");
var router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");
//const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

/* POST one user => REGISTER. */
router.post("/register", function (req, res, next) {
	const { name, username, email, password } = req.body;
	models.Users.create({ name, username, email, password })
		.then(() => res.send({ message: "new user added succesfully!" }))
		.catch((error) => {
			res.status(500).send(error);
		});
});

//POST user LOGIN
router.post("/login", async function (req, res, next) {
	const { email, password } = req.body;
	try {
		const user = await models.Users.findOne({ where: { email } });

		if (user === null) {
			res.send({ message: "user doesn't exist" });
		} else {
			user_id = user.id;
			const correctPassword = await bcrypt.compare(password, user.password);
			if (!correctPassword) throw new Error("Incorrect password");
			var token = jwt.sign({ user_id }, supersecret);
			res.send({ message: "Login successful, here is your token", token });
		}
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
});

/* GET users listing. We don't need this so far.*/
router.get("/", userShouldBeLoggedIn, function (req, res, next) {
	models.Users.findAll()
		.then((data) => res.send(data))
		.catch((error) => {
			res.status(500).send(error);
		});
});

/* GET user's profile. */
router.get("/myprofile", userShouldBeLoggedIn, async function (req, res, next) {
	const id = req.user_id;
	try {
		const user = await models.Users.findOne({
			where: {
				id,
			},
		});
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.put(
	"/profile_update",
	userShouldBeLoggedIn,
	async function (req, res, next) {
		const { name, username, email, password } = req.body;
		const id = req.user_id;
		try {
			await models.Users.update(
				{ name, username, email, password },
				{
					where: {
						id,
					},
				}
			);

			res.send({ message: "user updated succesfully!" });
		} catch (error) {
			res.status(500).send(error);
		}
	}
);

/* DELETE one user. */
router.delete("/", userShouldBeLoggedIn, async function (req, res, next) {
	//const { id } = req.params;
	try {
		const id = req.user_id;
		models.Users.destroy({
			where: {
				id,
			},
		});
		res.send({ message: "user deleted!" });
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;

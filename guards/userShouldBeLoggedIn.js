const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    jwt.verify(token, supersecret, async function (err, decoded) {
      if (err) res.status(401).send({ message: err.message });
      else {
        //everything is awesome
        req.user_id = decoded.user_id;
        const user = await models.Users.findOne({
          where: { id: req.user_id },
        });
        if (!user) {
          return res.status(401).send({ message: "Log in again" });
        }
        req.user = user;
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;

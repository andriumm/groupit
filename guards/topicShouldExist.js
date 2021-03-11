const models = require("../models");

async function topicShouldExist(req, res, next) {
  const { id } = req.params;
  const topic = await models.Topics.findOne({ where: { id } });
  if (!topic) return res.status(404).send({ message: "Topic does not exist" });
  req.topic = topic;
  next();
}

module.exports = topicShouldExist;

const models = require("../models");
async function resourceShouldBelongToTopic(req, res, next) {
  const user_id = req.user_id;
  console.log(req.resource);
  const { topic_id } = req.resource;

  const topic = await models.Topics.findOne({
    where: { user_id, id: topic_id },
  });
  if (!topic)
    return res
      .status(404)
      .send({ message: "Resource either does not belong to this topic or to this user!!" });

  next();
}

module.exports = resourceShouldBelongToTopic;

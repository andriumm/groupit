const models = require("../models");

async function topicBelongsToUser(req, res, next) {
  // const { user_id } = req.params; //??
  const user = req.user;
  const { id } = req.params;

  const usersTopic = await models.Topics.findOne({
    where: {
      // user_id: user.id,
      id,
    },
  });
  console.log(usersTopic);
  if (usersTopic.user_id !== user.id)
    return res.status(404).send({ message: "Topic does not belong to YOU!!" });
  next();
}

module.exports = topicBelongsToUser;

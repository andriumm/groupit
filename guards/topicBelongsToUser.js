async function topicBelongsToUser(req, res, next) {
  const { user_id } = req.params; //??
  const usersTopic = await req.user.getTopic({ where: { user_id } });
  if (!usersTopic)
    return res.status(404).send({ message: "Topic does not exist" });
  next();
}

module.exports = topicBelongsToUser;

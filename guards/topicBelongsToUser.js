async function topicBelongsToUser(req, res, next) {
  // const { user_id } = req.params; //??
  const user = req.user;
  const { id } = req.params;

  const usersTopic = await req.user.getTopics({
    where: {
      user_id: user.id,
      id,
    },
  });
  console.log(usersTopic);
  if (!usersTopic)
    return res.status(404).send({ message: "Topic does not belong to YOU!!" });
  next();
}

module.exports = topicBelongsToUser;

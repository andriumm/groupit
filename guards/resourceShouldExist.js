const models = require("../models");

async function resourceShouldExist(req, res, next) {
  const { id } = req.params;
  const resource = await models.Resources.findOne({ where: { id } });
  if (!resource)
    return res.status(404).send({ message: "Resource does not exist" });
  req.resource = resource;
  next();
}

module.exports = resourceShouldExist;

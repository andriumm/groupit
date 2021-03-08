"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Topics.hasMany(models.Resources, { foreignKey: "topic_id" });
      Topics.belongsTo(models.Users, { foreignKey: "user_id" });
    }
  }
  Topics.init(
    {
      user_id: DataTypes.INTEGER,
      topic_name: DataTypes.STRING,
      priority: DataTypes.BOOLEAN,
      parent: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Topics",
    }
  );
  return Topics;
};

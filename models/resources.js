"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Resources extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Resources.belongsTo(models.Topics, { foreignKey: "topic_id" });
    }
  }
  Resources.init(
    {
      topic_id: DataTypes.INTEGER,
      resource_name: DataTypes.STRING,
      url: DataTypes.STRING,
      format: DataTypes.STRING,
      priority: DataTypes.INTEGER,
      complete: DataTypes.BOOLEAN,
      reminder: DataTypes.BOOLEAN,
      created_date: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Resources",
    }
  );
  return Resources;
};

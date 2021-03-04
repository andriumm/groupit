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
			Topics.hasMany(models.Resources);
			Topics.belongsTo(models.Users);
		}
	}
	Topics.init(
		{
			user_id: DataTypes.INTEGER,
			topic_name: DataTypes.STRING,
			priority: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Topics",
		}
	);
	return Topics;
};

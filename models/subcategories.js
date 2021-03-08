"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Subcategories extends Model {
		static associate(models) {
			Subcategories.belongsTo(models.Topics, { foreignKey: "topic_id" });
			Subcategories.hasMany(models.Resources, { foreignKey: "subcategory_id" });
		}
	}
	Subcategories.init(
		{
			topic_id: DataTypes.INTEGER,
			subcategory_name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Subcategories",
		}
	);
	return Subcategories;
};

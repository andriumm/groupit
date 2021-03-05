"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Users.hasMany(models.Topics, { foreignKey: "user_id" });
			//   Users.belongsTo(models.Topics);
			Users.hasMany(models.Resources, { foreignKey: "user_id" });
		}
	}
	Users.init(
		{
			name: DataTypes.STRING,
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				set(value) {
					const hash = bcrypt.hashSync(value, saltRounds);
					this.setDataValue("password", hash);
				},
			},
		},
		{
			sequelize,
			modelName: "Users",
		}
	);
	return Users;
};

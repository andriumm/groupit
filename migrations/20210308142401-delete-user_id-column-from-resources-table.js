"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("resources", "user_id");
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("resources", "user_id");
	},
};

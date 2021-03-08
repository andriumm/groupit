"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("subcategories");
		await queryInterface.removeColumn("resources", "subcategory");
	},

	// down: async (queryInterface, Sequelize) => {

	//    await queryInterface.dropTable('users');

	// }
};

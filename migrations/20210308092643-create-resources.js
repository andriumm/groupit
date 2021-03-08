"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Resources", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			topic_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			resource_name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			url: {
				type: Sequelize.STRING,
			},
			format: {
				type: Sequelize.STRING,
			},
			priority: {
				type: Sequelize.INTEGER,
			},
			complete: {
				type: Sequelize.BOOLEAN,
			},
			reminder: {
				type: Sequelize.BOOLEAN,
			},
			created_date: {
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Resources");
	},
};

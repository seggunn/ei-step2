const {Sequelize} = require("sequelize");

class Users {
	init(sequelize) {
		this.orm = sequelize.define("users", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
		});
	}

	async create(user) {
		const result = await this.orm.create(user);
		console.log(`Created user: ${result}`);
		return result;
	}
}

module.exports = new Users();
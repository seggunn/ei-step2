const {Sequelize} = require("sequelize");
const logger = require("../lib/logger");

class Trades {
	init(sequelize) {
		this.orm = sequelize.define("trades", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			type: {
				allowNull: false,
				type: Sequelize.ENUM("buy", "sell"),
				validate: {
					isIn: {
						args: [["buy", "sell"]],
						msg: "Must be buy or sell"
					}
				}
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				field: "user_id",
				// references: {
				// 	model: "users",
				// 	key: "id"
				// }
			},
			symbol: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			shares: {
				allowNull: false,
				type: Sequelize.INTEGER,
				validate: {
					min: 1,
					max: 100,
				}
			},
			price: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			timestamp: {
				allowNull: false,
				type: Sequelize.INTEGER,
			}
		}, {
			timestamps: false,
			paranoid: false
		});

		this.orm = sequelize;
	}

	async create(trade) {
		try{
			return await this.orm.models.trades.create(trade);
		} catch(err) {
			if(err.name === 'SequelizeValidationError') {
				return {
					validationError: err.errors.map(e => `[${e.path}]: ${e.message}`).join('; ')
				};
			}
			return Promise.reject(err);
		}s
	}

	async findAll(query) {
		return await this.orm.models.trades.findAll({where: query});
	}

	async findByPk(id) {
		return await this.orm.models.trades.findByPk(id);
	}
}

module.exports = new Trades();
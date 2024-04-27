const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const Users = require('../models/users');
const Trades = require('../models/trades');

const ConnectionBase = require('./connection-base');
const logger = require('./logger');

const connect = () => sequelize.authenticate()
    .then(result => {
        Users.init(sequelize);
        Trades.init(sequelize);
        logger.log(`SQLite successfully connected!`);
        return sequelize.sync();
    })
    .then(result => {
        logger.log(`Table created`);
        return result;
    })
    .catch(error => {
        logger.error('Unable to connect to SQLite database:', error);
    })

class SequelizeConnection extends ConnectionBase {
    getConnection() {
        if (this.connection) {
            return this.connection;
        }
        this.connection = connect();
        return this.connection
    }

    async clearDatabase() {
        await sequelize.drop();
        return sequelize.sync();
    }
}

module.exports = SequelizeConnection;

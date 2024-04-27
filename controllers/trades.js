const Trades = require('../models/trades');

class TradesController {
	static async create(req, res){
		const result = await Trades.create(req.body);
		if(result.validationError){
			res.status(400).send(result.validationError);
		}else{
			res.status(201).json(result);
		}
	}

	static async findAll(req, res){
		const result = await Trades.findAll(req.query);
		res.json(result);
	}

	static async findByPk(req, res){
		const result = await Trades.findByPk(req.params.id);
		if(result){
			res.json(result);
		}else{
			res.status(404).send('ID not found');
		}
	}

	static async denied(req, res){
		res.status(405).json('Not allowed');
	}
}

module.exports = TradesController;

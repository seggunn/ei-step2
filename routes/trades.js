const express = require('express');
const router = express.Router();
const controller = require('../controllers/trades');

router.post('/', (req, res, next) => controller.create(req, res).catch(next));

router.get('/', (req, res, next) => controller.findAll(req, res).catch(next));

router.get('/:id', (req, res, next) => controller.findByPk(req, res).catch(next));

router.put('/:id', controller.denied);

router.patch('/:id', controller.denied);

router.delete('/:id', controller.denied);

module.exports = router;

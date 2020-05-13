const express = require('express');
const knex = require('knex');
const knexfile = require('../knexfile.js');
const environment = process.env.NODE_ENV || 'development';

// const dbConfig = knexfile[environment];
// const db = knex(dbConfig);
const db = require('../data/dbConnections.js');

const router = express.Router();

router.get('/', (req, res) => {
	db('cars')
		.then((cars) => {
			res.json(cars);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Cannot get cars' });
		});
});

router.get('/:id', (req, res) => {
	db('cars')
		.where({ id: req.params.id })
		.first()
		.then((car) => {
			if (car) {
				res.status(200).json(car);
			} else {
				res.status(400).json({ error: 'Car with that Id not found' });
			}
		})
		.catch((error) => {
			res.status(500).json({ Message: 'Cannot get car' });
		});
});
router.post('/', (req, res) => {
	const car = req.body;
	if (isValidCar(car)) {
		db('cars')
			.insert(car, 'id')
			.then((ids) => {
				res.status(201).json({ data: ids });
			})
			.catch((error) => {
				res.status(500).json({ Message: 'Cannot post car' });
			});
	} else {
		res.status(400).json({ Message: 'Please provide VIN, Make, MOdel & Make' });
	}
});
router.put('/:id', (req, res) => {
	const changes = req.body;
	db('cars')
		.where({ id: req.params.id })
		.update(changes)
		.then((car) => {
			if (car) {
				res.status(200).json({ data: car });
			} else {
				res.status(400).json({ message: 'The car was not found by that id' });
			}
			res.status(201).json({ data: car });
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
});
router.delete('/:id', (req, res) => {
	db('cars')
		.where({ id: req.params.id })
		.del()
		.then((car) => {
			if (car) {
				res.status(200).json({ data: car });
			} else {
				res.status(400).json({ message: 'The car was not found by that id' });
			}
			res.status(201).json({ data: car });
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
});

function isValidCar(car) {
	// check to see if you have both properties
	return Boolean(car.VIN && car.Make && car.Model && car.Make);
}

module.exports = router;

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('cars')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('cars').insert([
				{
					Model: 'Tazz',
					VIN: '12642',
					Make: 'Toyota',
					Milage: 125,
					Transmition: 'Manual',
					Title: '',
				},
				{
					Model: 'GTI',
					VIN: '7785',
					Make: 'Volkwagon',
					Milage: 55600,
					Transmition: 'Automatic',
					Title: '',
				},
			]);
		});
};

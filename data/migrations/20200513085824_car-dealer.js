exports.up = function (knex) {
	return knex.schema.createTable('cars', (tbl) => {
		tbl.increments();
		tbl.string('VIN').notNullable().unique();
		tbl.string('Make').notNullable(); //means required
		tbl.string('Model').notNullable();
		tbl.integer('Milage').notNullable();
		tbl.string('Transmition');
		tbl.string('Title');
	});
};

exports.down = function (knex) {
	//cleans the tables - rollback function
	return knex.schema.dropTableIfExists('cars');
};

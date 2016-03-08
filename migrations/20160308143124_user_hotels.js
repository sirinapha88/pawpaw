
exports.up = function(knex, Promise) {
	return knex.schema.createTable('user_hotels', function(table){
		table.increments();
		table.integer('user_id').references('id').inTable('users').onDelete('cascade'); 
		table.boolean('isFavorite');
		table.boolean('hasStayed')  
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('user_hotels');  
};

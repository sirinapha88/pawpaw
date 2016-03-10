exports.up = function(knex, Promise) {
	return knex.schema.createTable('hotels', function(table){
 		table.increments();// id serial primary key
 		table.string('name');
 		table.string('phone');
 		table.string('imgURL');
 		table.json('address');
 		table.string('zipcode');
 		table.json('room_type');
 		table.json('categories');
 	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('hotels');  
};
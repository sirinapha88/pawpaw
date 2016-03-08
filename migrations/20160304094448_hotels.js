exports.up = function(knex, Promise) {
	return knex.schema.createTable('hotels', function(table){
 		table.increments();// id serial primary key
 		table.string('name');
 		table.json('address');
 		table.json('room_type');
 		table.string('facebook_id');
 	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('hotels');  
};
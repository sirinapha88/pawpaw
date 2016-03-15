exports.up = function(knex, Promise) {
	return knex.schema.createTable('hotels', function(table){
 		table.increments();// id serial primary key
 		table.string('name');
 		table.string('phone');
 		table.string('address');
 		table.string('zipcode');
 		table.json('imgURL');		
 		table.json('room_Rate');
 		table.string('pet_type');
 	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('hotels');  
};
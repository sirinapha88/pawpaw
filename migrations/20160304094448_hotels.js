exports.up = function(knex, Promise) {
	return knex.schema.createTable('hotels', function(table){

 		table.increments();// id serial primary key
 		table.string('placeId');
 		table.string('name');
 		table.string('phone');
 		table.string('address');
 		table.string('address2').nullable();
 		table.string('city');
 		table.string('zipcode');
 		table.json('imgURL').nullable();	
 		table.json('room_Rate');
 		table.string('pet_type');
 		table.string('rating').nullable();
 		table.string("latitude");
  		table.string("longitude");
 	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('hotels');  
};
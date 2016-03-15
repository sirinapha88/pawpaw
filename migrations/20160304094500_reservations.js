
exports.up = function(knex, Promise) {
	return knex.schema.createTable('reservations',function(table){
		table.increments();
		table.integer('user_id').references('id').inTable('users').onDelete('cascade'); 
		table.integer('hotel_id').references('id').inTable('hotels').onDelete('cascade'); 
		table.string('room_type');
		table.string('rate_paid');
		table.string('pet_type');
		table.date('checkin');
		table.date('checkout');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('reservations');  
};

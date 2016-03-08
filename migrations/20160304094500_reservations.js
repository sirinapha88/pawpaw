
exports.up = function(knex, Promise) {
	return knex.schema.createTable('reservations'),function(table){
		table.increments();
		table.integer('user_id').references('id').inTable('users').onDelete('cascade'); 
		table.string('room_type');
		table.string('pet_type');
		table.date('checkin');
		table.date('checkout');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('reservations');  
};

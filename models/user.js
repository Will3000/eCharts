var mongoose = require('mongoose');

userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String,
		email: String,
		firstName: String,
		lastName: String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	table_id: [String]
});

module.exports = mongoose.model('User', userSchema);

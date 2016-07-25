
var mongoose = require('mongoose');

// module.exports = mongoose.model('User',{
// 	id: String,
// 	username: String,
// 	password: String,
// 	email: String,
// 	firstName: String,
// 	lastName: String,
// 	facebook: {
// 		id: String,
// 		token: String,
// 		email: String,
// 		name: String
// 	}
// });

userSchema = mongoose.Schema({
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

module.exports = mongoose.model('User', userSchema);

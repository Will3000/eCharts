var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tableSchema = new Schema({ name:{type: String}, table_data: {}, user_id:{type: String}});
module.exports = mongoose.model('Table', tableSchema);

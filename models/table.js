var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tableSchema = new Schema({ name:{}, table_data: {}, user_id:{} });
module.exports = mongoose.model('Table', tableSchema);

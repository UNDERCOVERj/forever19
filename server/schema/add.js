const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    userName:  String,
    phone: String,
    professional: String,
    sex: String,
    address: String
}); 
module.exports = {
    personSchema
}
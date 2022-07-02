const mongoose = require('mongoose');

//schema for users collection
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    place: String,
    products: []
})



module.exports = mongoose.model('User',userSchema)
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    facebook: {
        id:    String,
        token: String
    },
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: {type: mongoose.Schema.ObjectId, ref: 'websiteModel'},
    dateCreated: {type: Date, default: Date.now},
    roles: [{type: String, default: 'USER', enum: ['USER', 'STUDENT', 'FACULTY', 'ADMIN']}],
}, {collection: "webdev_users"});

module.exports = userSchema;
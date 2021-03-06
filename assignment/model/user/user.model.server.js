var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userModel;

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    user.roles = ['USER'];
    return userModel.create(user);
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, user) {
    return userModel.update(
        {_id: userId},
        {$set: user});
}

function findAllUsers() {
    return userModel.find();
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

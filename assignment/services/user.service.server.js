var app = require('../../express');
var userModel = require('../model/user/user.model.server');

app.get   ('/api/user', findUserByCredentials);
app.get   ('/api/user/:userId', findUserById);
app.post  ('/api/user', createUser);
app.put   ('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
            },
            function (err) {
                res.status(404).send("Unable to delete user");
            });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel
        .updateUser(userId, user)
        .then(function (user) {
                res.sendStatus(200);
            },
            function (err) {
                res.status(404).send("Unable to update User")
            })
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    console.log([username, password]);

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user != null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.send(user);
        });
}
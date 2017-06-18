var app = require('../../express');
var bcrypt = require("bcrypt-nodejs");
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
app.get   ('/api/user', isAdmin, findAllUsers);
app.get   ('/api/user/:userId', findUserById);
app.post  ('/api/user', createUser);
app.put   ('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', isAdmin, deleteUser);
app.post  ('/api/login', passport.authenticate('local'), login);
app.get   ('/api/checkLoggedIn', checkLoggedIn);
app.get   ('/api/checkAdmin', checkAdmin)
app.post  ('/api/logout', logout);
app.post  ('/api/register', register);
app.delete('/api/unregister', unregister);

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (status) {
            req.user.logout();
            res.sendStatus(200);
        });
}


function checkAdmin(req, res) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        });
}

// function localStrategy(username, password, done) {
//     userModel
//         .findUserByCredentials(username, password)
//         .then(
//             function(user) {
//                 if(user && bcrypt.compareSync(password, user.password)) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false);
//                 }
//                 return done(null, user);
//             },
//             function(err) {
//                 if (err) { return done(err); }
//             }
//         );
// }

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

//----------------------------before---------------------------------------
function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password) {
        return findUserByCredentials(req, res);
    }

    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        });
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

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
    user.password = bcrypt.hashSync(user.password);
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
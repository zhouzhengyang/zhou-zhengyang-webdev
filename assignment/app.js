var app = require('../express');

require('./services/user.service.server');

app.get('/goodbye', sayHello);
app.get('/website', sendWebsites);

function sendWebsites(req, res) {
    var websites = [
        {name: 'facebook'},
        {name: 'twitter'},
        {name: 'linkedin'}
    ];
    res.send(websites);
}

function sayHello() {
    console.log('hello');
}
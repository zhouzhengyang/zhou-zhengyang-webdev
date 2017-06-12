var app = require('../../express');
var websiteModel = require('../model/website/website.model.server');

app.get   ('/api/user/:userId/website', findAllWebsitesForUser);
app.get   ('/api/website/:websiteId', findWebsiteById);
app.post  ('/api/user/:userId/website', createWebsite);
app.put   ('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .deleteWebsite(websiteId)
        .then(function (status) {
                res.sendStatus(200);
            },
            function (err) {
                res.status(404).send("Unable to delete website");
            }
        );
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .findWebsiteById(websiteId)
        .then(
            function (website) {
                res.json(website);
            }
        );
}

function findAllWebsitesForUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params['userId'])
        .then(function (websites) {
            res.json(websites);
        });
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params['userId']
    website._user = userId;
    website.created = new Date();
    website.updated = new Date();
    websiteModel
        .createWebsite(website)
        .then(function (website) {
            res.json(website);
        })
}


function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (response) {
            res.json(response);
        });
}
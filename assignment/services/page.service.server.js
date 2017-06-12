var app = require('../../express');
var pageModel = require('../model/page/page.model.server');

app.get   ('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get   ('/api/page/:pageId', findPageById);
app.post  ('/api/website/:websiteId/page', createPage);
app.put   ('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    pageModel
        .deletePage(pageId)
        .then(function (status) {
                res.sendStatus(200);
            },
            function (err) {
                res.status(404).send("Unable to delete page");
            }
        );
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];
    pageModel
        .updatePage(pageId, page)
        .then(function (response) {
           res.json(response);
        });
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        })
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params['websiteId'];
    page._website = websiteId;
    page.created = new Date();
    page.updated = new Date();
    pageModel
        .createPage(page)
        .then(function (page) {
           res.json(page);
        });
}

function findAllPagesForWebsite(req, res) {
    pageModel
        .findPagesByWebsiteId(req.params['websiteId'])
        .then(function (pages) {
            res.json(pages);
        });
}
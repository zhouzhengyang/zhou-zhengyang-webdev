var app = require('../../express');

app.get   ('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get   ('/api/page/:pageId', findPageById);
app.post  ('/api/website/:websiteId/page', createPage);
app.put   ('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.sendStatus(200);
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];
    for (var p in pages) {
        if (pageId === pages[p]._id) {
            pages[p].description = page.description;
            pages[p].name = page.name;
            res.sendStatus(200);
        }
    }
    res.sendStatus(404);
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    res.send(page);
}

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.created = new Date();
    page.updated = new Date();
    pages.push(page);
    res.send(page)
}

function findAllPagesForWebsite(req, res) {
    var resultSet = [];
    for(var p in pages) {
        if(pages[p].websiteId === req.params.websiteId) {
            resultSet.push(pages[p]);
        }
    }
    res.json(resultSet);
}
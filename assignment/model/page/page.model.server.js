var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');

var pageModel = mongoose.model('pageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findPagesByWebsiteId = findPagesByWebsiteId;
pageModel.updatePage = updatePage;
pageModel.findPageById = findPageById;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}

function createPage(page) {
    return pageModel.create(page)
}

function findPagesByWebsiteId(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website', 'name')
        .exec();
}

function findPageById(pageId) {
    return pageModel.findOne({_id: pageId});
}

function updatePage(pageId, page) {
    return pageModel.update(
        {_id: pageId},
        {$set: page});
}
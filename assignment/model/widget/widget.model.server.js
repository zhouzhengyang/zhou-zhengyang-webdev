var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

module.exports = widgetModel;

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

function reorderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var widgets = page._widgets;
            widgets.splice(end, 0, widgets.splice(start, 1)[0]);
            page._widgets = widgets;
            return pageModel.updatePage(pageId, page);
        })
}

function findWidgetsByPageId(pageId) {
    return widgetModel
        .find({_page: pageId})
        .populate('_page')
        .exec();
}

function createWidget(widget) {
    return widgetModel.create(widget);
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}


function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}
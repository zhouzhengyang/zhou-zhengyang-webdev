var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'},
    name: String,
    title: String,
    description: String,
    _widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'widgetModel'}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "webdev_page"});

module.exports = pageSchema;
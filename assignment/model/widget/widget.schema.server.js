var mongoose = require('mongoose');
var widgetSchema = mongoose.Schema({
    _page :  {type: mongoose.Schema.ObjectId, ref: "pageModel",require:true},
    widgetType: {type: String, enum:['HEADING','IMAGE','YOUTUBE','HTML','TEXT']},
    name : String,
    description: String,
    url: String,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    placeholder: String,
    position: Number,
    text: String,
    width: String,
    height: String,
    rows: Number,
    dateCreated:{type:Date, default: Date.now}
},{collection: "webdev_widget"});
module.exports = widgetSchema;
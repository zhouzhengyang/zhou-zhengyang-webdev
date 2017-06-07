var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads'});

app.get   ('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get   ('/api/widget/:widgetId', findWidgetById);
app.post  ('/api/page/:pageId/widget', createWidget);
app.put   ('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.post  ("/api/upload", upload.single('myFile'), uploadImage);
app.put   ('/page/:pageId/widget', sortWidget);


var widgets =
    [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function sortWidget(req, res) {
        var pageId = req.params['pageId'];
        var start = req.query['initial'];
        var end = req.query['final'];
        var origin = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                origin.push(w);
            }
        }
        var previndex = origin[start];
        var curindex = origin[end];
        var widget = widgets[previndex];
        widgets.splice(previndex, 1);
        widgets.splice(curindex, 0, widget);
        res.sendStatus(200);
    }


    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var temp = false;

        var widget = {"_id":widgetId,
                      "widgetType" :"IMAGE",
                      "pageId" :pageId,
                      "width" : width,
                      "url" :"/assignment/uploads/"+filename}

        if (widgetId === "") {
            widget._id = widgets[widgets.length-1]._id+1+"";
        }

        for (var w in widgets) {
            if (widgetId === widgets[w]._id) {
                widgets[w] = widget;
                temp = true;
            }
        }

        if(!temp){
            widgets.push(widget);
        }

        var callbackUrl = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

        res.redirect(callbackUrl);
    }


function findAllWidgetsForPage(req, res) {
    var resultSet = [];
    for (var w in widgets) {
        if (widgets[w].pageId = req.params.pageId) {
            resultSet.push(widgets[w]);
        }
    }
    res.json(resultSet);
}

function createWidget(req, res) {
    var widget = req.body;
    widget._id = widgets[widgets.length-1]._id+1+"";
    widget.pageId = req.params['pageId'];
    widgets.push(widget);
    res.send(widget);
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId']
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    res.send(widget);
}


function updateWidget(req, res) {
    var widgetId = req.params['widgetId']
    var widget = widgets.find(function (widget) {
        return widgetId === widget._id
    })
    if (widget !== null) {
        if (widget.widgetType === "IMAGE") {
            widget.url = req.body['url']
            widget.width = req.body['width']
            res.sendStatus(200)
            return
        }
        if (widget.widgetType === "YOUTUBE") {
            widget.url = req.body['url']
            widget.width = req.body['width']
            res.sendStatus(200)
            return
        }
        if (widget.widgetType === "HEADING") {
            widget.text = req.body['text']
            widget.size = req.body['size']
            res.sendStatus(200)
            return
        }
    }
    res.sendStatus(404)
}


function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.sendStatus(200);
}
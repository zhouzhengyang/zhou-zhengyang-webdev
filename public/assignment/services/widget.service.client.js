(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService() {

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

        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
        };

        function createWidget(pageId, widget) {
            widget._id = widgets[widgets.length-1]._id+1+"";
            widget.pageId = pageId
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var resultSet = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    resultSet.push(widgets[w]);
                }
            }
            return resultSet;
        }
        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }


        function updateWidget(widgetId, widget) {
            var temp = findWidgetById(widgetId);
            widget._id = widgetId;
            widgets[widgets.indexOf(temp)] = widget
        }

        function deleteWidget(widgetId) {
            var widget = widgets.find(function (widget) {
                return widget._id === widgetId;
            });
            var index = widgets.indexOf(widget);
            widget.splice(index, 1);
        }
    }
})()
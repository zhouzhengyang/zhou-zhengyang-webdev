(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Today we got</p>'},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        function createWidget (widget) {
            widget._id = (new Date()).getTime() + "";
            widget.created = new Date();
            widget.updated = new Date();
            widget.push(widget);
        }

        function findWidgetsByPageId (pageId) {
            var result = []
            for (var u in widgets) {
                if (widgets[u].pageId === pageId) {
                    result.push(widgets[u])
                }
            }
            return result
        }

        function findWidgetById (widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function updateWidget (widgetId, widget) {
            var found = findWidgetById(widgetId)
            if (found !== null) {
                if (found.widgetType === "HEADING") {
                    found.text = widget.text
                    found.size = widget.size
                    return found
                }
                if (found.widgetType === "IMAGE") {
                    found.url = widget.url
                    found.width = widget.width
                    return found
                }
                if (found.widgetType === "YOUTUBE") {
                    found.url = widget.url
                    found.width = widget.width
                    return found
                }
            }
            return null
        }

        function deleteWidget (widgetId) {
            var widget = widgets.find(function (widget) {
                return widget._id === widgetId;
            });
            var index = widgets.indexOf(widget);
            pages.splice(index, 1);
        }
    }
})()
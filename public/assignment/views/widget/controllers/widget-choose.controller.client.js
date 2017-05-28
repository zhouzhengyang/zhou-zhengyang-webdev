(function () {
    angular
        .module('WAM')
        .controller('widgetChooseController', widgetChooseController)

    function widgetChooseController ($location, widgetService, $routeParams) {
        var model = this

        model.userId = $routeParams['userId']
        model.websiteId = $routeParams['websiteId']
        model.pageId = $routeParams['pageId']
        model.widgetId = $routeParams['widgetId']
        model.widget = widgetService.findWidgetById(model.widgetId)

        model.createWidget = createWidget;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;


        function init () {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId)
        }
        init()

        function createWidget(widgetType) {
            if (widgetType === 'header') {
                var widget = {
                    widgetType: "HEADING",
                    pageId: model.pageId,
                    size: 4
                }
                newWidget = widgetService.createWidget(model.pageId, newWidget)
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newWidget._id + '/' + 'heading')
            }

            if (widgetType === 'image') {
                var widget = {
                    widgetType: "IMAGE",
                    pageId: model.pageId,
                    width: "100%",
                    url: model.url
                }
                newWidget = widgetService.createWidget(model.pageId, newWidget)
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newWidget._id + '/' + 'image')
            }

            if (widgetType === 'youtube') {
                var widget = {
                    widgetType: "YOUTUBE",
                    pageId: model.pageId,
                    width: "100%",
                    url: model.url
                }
                newWidget = widgetService.createWidget(model.pageId, newWidget)
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newWidget._id + '/' + 'youtube')
            }
        }


        function updateWidget(widget) {
            if (type === 'HEADING') {
                var widget = {
                    text : text,
                    size : size
                }
                widgetService.updateWidget(model.widgetId, widget)
                return null
            }
            if (type === 'IMAGE') {
                var widget = {
                    url : text,
                    width : size
                }
                widgetService.updateWidget(model.widgetId, widget)
                return null
            }
            if (type === 'YOUTUBE') {
                var widget = {
                    url : text,
                    width : size
                }
                widgetService.updateWidget(model.widgetId, widget)
                return null
            }
            return null
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId)
        }
    }
})()
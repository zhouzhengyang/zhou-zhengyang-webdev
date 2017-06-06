(function () {
    angular
        .module('WAM')
        .controller('widgetChooseController', widgetChooseController)

    function widgetChooseController ($location, widgetService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        //model.widget = widgetService.findWidgetById(model.widgetId);

        model.createWidget = createWidget;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init () {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                })
        }
        init();

        function createWidget(widget){
            widget.pageId = model.pageId;
            widgetService
                .createWidget(model.pageId,widget)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +model.pageId+'/widget');
                })
        }

        function deleteWidget(widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +model.pageId+'/widget');
                })
        }

        function updateWidget(widget){
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +model.pageId+'/widget');
                })
        }
    }
})()
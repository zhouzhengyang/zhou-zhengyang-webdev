(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                  $location,
                                  widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        //model.widget = widgetService.findWidgetById(model.widgetId);
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.createWidget = createWidget;


        function init () {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
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
})();
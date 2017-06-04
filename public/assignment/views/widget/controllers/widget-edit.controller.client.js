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
        model.widget = widgetService.findWidgetById(model.widgetId);
        model.updateWidget = updateWidget

        function updateWidget(awidget){
            console.log(awidget)
            widgetService.updateWidget(model.widgetId,awidget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +model.pageId+'/widget');

        }
    }
})();
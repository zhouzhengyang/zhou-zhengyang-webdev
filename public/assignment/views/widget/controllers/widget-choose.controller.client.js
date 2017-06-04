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
        model.widget = widgetService.findWidgetById(model.widgetId);

        model.createWidget = createWidget

        function createWidget(awidget){
            awidget.pageId = model.pageId;
            widgetService.createWidget(model.pageId,awidget)
            console.log(awidget)
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' +model.pageId+'/widget');
        }
    }
})()
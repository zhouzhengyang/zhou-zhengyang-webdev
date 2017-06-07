(function () {
    angular
        .module('Directives', [])
        .directive('wbSortable', wbSortable);

    function wbSortable(widgetService, $routeParams) {
        var model = this;
        model.pageId = $routeParams['pageId'];
        function linkFunction(scope, element) {
            $(element).sortable();

            $(element).on('sortdeactivate', function (event, ui) {
                var from = angular.element(ui.item).scope().$index;
                var to = element.children().index(ui.item);
                widgetService
                    .sortWidget(model.pageId, from, to)
            })
        }

        return {
            link: linkFunction
        }
    }
})();
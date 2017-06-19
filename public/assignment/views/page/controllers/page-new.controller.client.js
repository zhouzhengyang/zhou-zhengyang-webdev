(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  pageService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId']
        model.websiteId = $routeParams['websiteId'];

        // event handlers
        model.createPage = createPage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();

        // implementation
        function createPage(page) {
            var name = page.name;
            if (name === null || name === '' || typeof name === 'undefined') {
                model.message = "Invalid name!"
                return
            }
            page.websiteId = model.websiteId;
            pageService
                .createPage(model.websiteId, page)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                })
        }
    }
})();
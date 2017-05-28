(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                               pageService,
                               $location) {

        var model = this;
        model.userId = $routeParams['userId']
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams.pageId;

        // event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);

        }
        init();

        // implementation
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');

        }

        function updatePage(name, description) {
            if (name === '' || name === null || typeof name === undefined) {
                model.error = "name can't be empty"
                return
            }
            var page = {name: name,
                description: description}
            pageService.updateWebsite(pageId, page);
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();
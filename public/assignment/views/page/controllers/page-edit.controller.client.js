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
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
            pageService
                .findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
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

        function updatePage(name, description) {
            if (name === '' || name === null || typeof name === undefined) {
                model.error = "name can't be empty"
                return
            }
            var page = {name: name,
                description: description}

            pageService
                .updatePage(model.pageId, page)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                })
        }

        function deletePage(pageId) {
            pageService
                .deletePage(model.pageId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                })
        }
    }
})();
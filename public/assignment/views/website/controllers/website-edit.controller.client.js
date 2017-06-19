(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   websiteService,
                                   $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        // event handlers
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (website) {
                    model.website = website;
                });
        }
        init();

        // implementation
        function createWebsite(website) {
            var name = website.name;
            if (name === null || name === '' || typeof name === 'undefined') {
                model.message = "Invalid name!"
                return
            }
            website.developerId = model.userId;
            websiteService
                .createWebsite(model.userId, website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                })
        }

        function updateWebsite(name, description) {
            if (name === '' || name === null || typeof name === undefined) {
                model.error = "name can't be empty"
                return
            }
            var website = {name: name,
                           description: description};

            websiteService
                .updateWebsite(model.websiteId, website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                })
        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                })
        }
    }
})();
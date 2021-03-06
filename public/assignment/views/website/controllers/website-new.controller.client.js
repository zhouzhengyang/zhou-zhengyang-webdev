(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites
                });        }
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
    }
})();
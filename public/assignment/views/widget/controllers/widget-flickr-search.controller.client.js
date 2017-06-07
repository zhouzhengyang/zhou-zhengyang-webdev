(function () {
    angular
        .module('WAM')
        .controller('widgetFlickrController', widgetFlickrController);


    function widgetFlickrController(flickrService, $routeParams, widgetService, $location) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {
                "widgetType": "IMAGE", "pageId": model.pageId, "width": "100%",
                "url": url
            };
            widget._id = model.widgetId;
            widgetService
                .createWidget(model.pageId, widget)
                .then(
                    $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id));
        }

        function searchPhotos (searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

    }
})();
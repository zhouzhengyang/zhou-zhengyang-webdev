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
                "widgetType": "IMAGE", "_page": model.pageId, "width": "100%",
                "url": url
            };
            if(typeof model.widgetId === 'undefined'){
                widgetService.createWidget(model.pageId, widget)
                    .then(function(widget){
                        $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
                    })
            } else {
                widgetService.updateWidget(model.widgetId,widget)
                    .then(function(widget){
                        $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);
                    })}
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
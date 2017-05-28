(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;
        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);

        // event handlers
        model.update = update;

        // implementation
        function update(userId, username, firstName, lastName, password, password2) {

            if(password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var found = userService.findUserById(userId);

            if(found !== null) {
                model.error = "Username is not available";
            } else {
                var user = {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                };
                userService.updateUser(userId, user);
                $location.url('/user/' + user._id);
            }
        }
    }
})();

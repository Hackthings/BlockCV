app.controller("CarCreateCtrl", ['$scope', function ($scope) {
    $scope.deploy = function (car) {
        window.location.href = "#/cars/home";
    };

}]);

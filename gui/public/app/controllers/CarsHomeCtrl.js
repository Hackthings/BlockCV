app.controller("CarsHomeCtrl", ['$scope', function ($scope) {
    $scope.cars = [
        { plate: "YO33 ACE", "location": "Peterson Street", "status": "AVAILABLE", "miles": "40,342"},
        { plate: "P33 3CC", "location": "Oxford Circus", "status": "ON_JOB", "miles": "40,342"},
        { plate: "YO33 BTE", "location": "Grant Road", "status": "AVAILABLE", "miles": "40,342"},
        { plate: "DO11 DDE", "location": "Powis Gardens", "status": "IN_SERVICE", "miles": "40,342"},
        { plate: "AA044 GAE", "location": "Regent Street", "status": "AVAILABLE", "miles": "40,342"},
        { plate: "YO3 6PE", "location": "Regent Street", "status": "AVAILABLE", "miles": "40,342"},
    ];
}]);

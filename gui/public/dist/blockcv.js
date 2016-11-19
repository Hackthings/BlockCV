var app = angular.module("blockcv", ['ngRoute']);
app.controller("CarCreateCtrl", ['$scope', function ($scope) {
    $scope.deploy = function (car) {
        window.location.href = "#/cars/home";
    };

}]);

app.controller("CarCtrl", ['$scope', function ($scope) {
    var deployed = new Date();
    deployed.setDate(deployed.getDate()-400);
    var today = new Date();
    var debits = [
        { "date": today.setTime(today.getDate() - 1),  "type": "FUEL", "description": "Fuel Fill Up 40L @ 123p", "provider": "Shell Recharge", "price": 49.20 },
        { "date": today.setTime(today.getDate() - 4),  "type": "FUEL", "description": "Fuel Fill Up 40L @ 123p", "provider": "Shell Recharge", "price": 49.20 },
        { "date": today.setTime(today.getDate() - 6),  "type": "FUEL", "description": "Fuel Fill Up 40L @ 123p", "provider": "Shell Recharge", "price": 49.20 },
        { "date": today.setTime(today.getDate() - 9),  "type": "FUEL", "description": "Fuel Fill Up 20L @ 123p", "provider": "Shell Recharge", "price": 39.20 },
        { "date": today.setTime(today.getDate() - 10),  "type": "FUEL", "description": "Fuel Fill Up 40L @ 123p", "provider": "Shell Recharge", "price": 49.20 },
    ];


    $scope.car =
        {
            plate: "YO33 ACE",
            "location": "Peterson Street",
            "status": "AVAILABLE",
            "miles": "40,342",
            "model": "Honda CVX Auto",
            "paid": 50345,
            "earned": 43345,
            "deployed": deployed,
            "trips": [{
                "date": new Date(),
                "customer": "Alice",
                "price": 16.32,
                "distance": 10.5,
                "start": "12:34",
                "startAddress": "St Pancras Station, Euston Rd, Kings Cross, London N1C 4QL, UK",
                "end": "13:10",
                "endAddress": "72-73 Russell Rd, Kensington, London W14, UK",
            }
            ],
            "debits": debits
        };

        $scope.car.pnl = $scope.car.earned - $scope.car.paid;
}]);

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

app.controller("HomeCtrl", ['$scope', function ($scope) {

}]);

app.controller("HumansHomeCtrl", ['$scope', function ($scope) {
    $scope.trips = [{
        "date": new Date(),
        "customer": "Alice",
        "price": 16.32,
        "distance": 10.5,
        "start": "12:34",
        "startAddress": "St Pancras Station, Euston Rd, Kings Cross, London N1C 4QL, UK",
        "end": "13:10",
        "endAddress": "72-73 Russell Rd, Kensington, London W14, UK",
    }];
}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'app/partials/home.html',
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });

   // $locationProvider.html5Mode(true);
}]);
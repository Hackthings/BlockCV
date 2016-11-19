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

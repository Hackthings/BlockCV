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

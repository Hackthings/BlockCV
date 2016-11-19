app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'app/partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/uni', {
            templateUrl: 'app/partials/uni.html',
            controller: 'HomeCtrl'
        })
        .when('/student', {
            templateUrl: 'app/partials/student.html',
            controller: 'HomeCtrl'
        })
        .when('/employer', {
            templateUrl: 'app/partials/employer.html',
            controller: 'HomeCtrl'
        })
        .when('/employer-results', {
            templateUrl: 'app/partials/employer-results.html',
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });

   // $locationProvider.html5Mode(true);
}]);
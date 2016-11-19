app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'app/partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/uni', {
            templateUrl: 'app/partials/uni.html',
            controller: 'UniCtrl'
        })
        .when('/student/:id', {
            templateUrl: 'app/partials/student.html',
            controller: 'StudentCtrl'
        })
        .when('/employer', {
            templateUrl: 'app/partials/employer.html',
            controller: 'EmployerCtrl'
        })
        .when('/employer-results', {
            templateUrl: 'app/partials/employer-results.html',
            controller: 'EmployerCtrl'
        })
    
      .when('/add-qualification', {
            templateUrl: 'app/partials/addqualification.html',
            controller: 'HomeCtrl'
        })
    
    
    
        .otherwise({
            redirectTo: '/home'
        });

   // $locationProvider.html5Mode(true);
}]);
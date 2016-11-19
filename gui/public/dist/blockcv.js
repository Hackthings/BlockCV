var app = angular.module("blockcv", ['ngRoute']);
app.controller("EmployerCtrl", ['$scope', '$params', 'BlockCVSvc', function ($scope, $params, BlockCVSvc) {
}]);

app.controller("HomeCtrl", ['$scope', function ($scope) {

}]);

app.controller("StudentCtrl", ['$scope', '$params', 'BlockCVSvc', function ($scope, $params, BlockCVSvc) {
    function load() {
        var studentId = $params.id;

        BlockCVSvc.getStudent(studentId)
            .success(function (data) {
                $scope.student = data.result.message;
            });
    }

    load();
}]);

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
app.factory("BlockCVSvc", ['$http', function ($http) {

    var nodeAddress = "addr:7050/chaincode";
    var chaincodeAddress = "234234234234234234234234234";

    function grantAccess(args) {
        var requestArgs = {
            method: "invoke",
            function: "grant-access",
            args: [args.studentId, args.employerName],
            name: chaincodeAddress
        };
        var request = generateRequest(requestArgs);

        return $http.post(nodeAddress, request);
    }

    function createStudent(student) {
        var key = b64EncodeUnicode(student.name);
        var requestArgs = {
            method: "invoke",
            function: "create-student",
            args: [key, student],
            name: chaincodeAddress
        };
        var request = generateRequest(requestArgs);

        return $http.post(nodeAddress, request);
    }

    function getStudent(studentId) {
        var requestArgs = {
            method: "query",
            function: "student-get",
            args: [studentId],
            name: chaincodeAddress
        };
        var request = generateRequest(requestArgs);

        return $http.post(nodeAddress, request);
    }

    function getStudentEmployer(args) {
        var requestArgs = {
            method: "query",
            function: "employer-get",
            args: [args.studentId, args.employerName],
            name: chaincodeAddress
        };
        var request = generateRequest(requestArgs);

        return $http.post(nodeAddress, request);
    }

    function addQualification(args) {
        var requestArgs = {
            method: "invoke",
            function: "add-qualification",
            args: [args.studentId, args.qualification],
            name: chaincodeAddress
        };
        var request = generateRequest(requestArgs);

        return $http.post(nodeAddress, request);
    }

    function generateRequest(args) {
        if (!args.method) {
            alert("You must specify an method");
            console.error("You must specify an method");
            return;
        }

        var request = {
            "jsonrpc": "2.0",
            "method": args.method,
            "params": {
                "type": 1,
                "chaincodeID":{
                },
                "ctorMsg": {
                    "args":["init", "a", "1000", "b", "2000"]
                }
            },
            "id": 1
        };

        if (args.name) {
            request.params.chaincodeID.name = args.name;
        }

        if (args.path) {
            request.params.chaincodeID.path = args.path;
        }

        request.params.ctorMsg.args = args.args || [];

        if (args.function) {
            request.params.ctorMsg.args.unshift(args.function || 'dummy');
        }

        var date = new Date();

        request.id = date.getTime();

        return request;
    }

    return  {
        "getStudentEmployer": getStudentEmployer,
        "getStudent": getStudent,
        "addQualification": addQualification,
        "createStudent": createStudent,
        "grantAccess": grantAccess,
    };

    function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }
}]);

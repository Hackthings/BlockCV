app.controller("StudentCtrl", ['$scope', '$routeParams', 'BlockCVSvc', function ($scope, $params, BlockCVSvc) {
    $scope.studentId = $params.id;
    function load() {
        BlockCVSvc.getStudent($scope.studentId)
            .success(function (data) {
                if (!data.result || !data.result.message) {
                    alert("There was a problem.  Check the console for the data");
                    console.log(data);
                    return;
                }
                console.log(data);
                $scope.student = JSON.parse(data.result.message);
            })
            .error(function (data) {
                console.error(data);
                alert(data);
            });
    }

    load();

    $scope.grantAccess = function (employerName) {
        var args = {
            employerName: employerName,
            studentId: $scope.studentId,
        };

        BlockCVSvc.grantAccess(args)
            .success(function (data) {
                console.log(data);
                load();
            })
            .error(function (data) {
                console.error(data);
                alert(data);
            });
    };
}]);

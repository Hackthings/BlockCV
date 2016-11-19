app.controller("EmployerCtrl", ['$scope', '$params', 'BlockCVSvc', function ($scope, $params, BlockCVSvc) {
    $scope.search = function search(id) {
        var args = {
            studentId: id,
            employerName: "Global INC"
        };

        BlockCVSvc.getStudentEmployer(args)
            .success(function (data) {
                $scope.student = data.result.message;
            })
    };

}]);

app.controller("EmployerCtrl", ['$scope', 'BlockCVSvc', function ($scope, BlockCVSvc) {
    $scope.search = function search(id) {
        var args = {
            studentId: id,
            employerName: "Global INC"
        };

        BlockCVSvc.getStudentEmployer(args)
            .success(function (data) {
                $scope.student = data.result.message;
            })
            .error(function (err) {
                console.error(err);
                alert(err);
            });
    };
}]);

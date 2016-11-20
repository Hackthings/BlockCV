app.controller("EmployerCtrl", ['$scope', 'BlockCVSvc', function ($scope, BlockCVSvc) {
    $scope.item = {};
    $scope.search = function search(id) {
        var args = {
            studentId: id,
            employerName: "IBM CORP"
        };
        $scope.student = null;
        BlockCVSvc.getStudentEmployer(args)
            .success(function (data) {
                console.log(JSON.stringify(data));
                if (!data.result) {
                    alert(JSON.stringify(data));
                }
                $scope.student = JSON.parse(data.result.message);
            })
            .error(function (err) {
                console.error(err);
                alert(err);
            });
    };
}]);

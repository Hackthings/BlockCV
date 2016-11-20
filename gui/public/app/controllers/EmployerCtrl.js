app.controller("EmployerCtrl", ['$scope', 'BlockCVSvc', function ($scope, BlockCVSvc) {
    $scope.item = {};
    $scope.search = function search(id) {
        var args = {
            studentId: id,
            employerName: "IBM CORP"
        };
        $scope.notAuthorised = false;
        $scope.student = null;
        $scope.notFound = false;
        BlockCVSvc.getStudentEmployer(args)
            .success(function (data) {
                console.log(JSON.stringify(data));
                if (!data.result) {
                   // alert(JSON.stringify(data));
                    $scope.notFound = true;
                    return;
                }
                if (data.result.message == "Not Authorised") {
                    $scope.notAuthorised = true;
                    return;
                }

                $scope.student = JSON.parse(data.result.message);
            })
            .error(function (err) {
                console.error(err);
                alert(err);
            });
    };
}]);

app.controller("UniCtrl", ['$scope', '$routeParams', 'BlockCVSvc', function ($scope, $params, BlockCVSvc) {


    $scope.search = function search(id) {
        var args = {
            studentId: id,
        };

        $scope.studentId = id;

        BlockCVSvc.getStudent(args)
            .success(function (data) {
                $scope.student = data.result.message;
            })
            .error(function (err) {
                console.error(err);
                alert(err);
            });
    };

    $scope.addQualification = function (qual) {
        var args = {
            studentId: $scope.studentId,
            qualification: qual
        };

        BlockCVSvc.addQualification(args)
            .success(function (data) {
                window.location.href = "#/uni";
            })
            .error(function (err) {
                console.error(err);
                alert(err);
            });
    };
}]);

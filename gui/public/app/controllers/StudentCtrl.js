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

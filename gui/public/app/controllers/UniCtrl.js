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
        qual.institution = "University of Bedfordshire";
        var args = {
            studentId: qual.studentId,
            qualification: qual
        };

        BlockCVSvc.addQualification(args)
            .success(function (data) {
                console.log(JSON.stringify(data));
                window.location.href = "#/student/" + qual.studentId;
            })
            .error(function (err) {
                console.error(err);
                alert(err);
            });
    };

    $scope.addStudent = function (student) {
        $scope.success = false;
        BlockCVSvc.createStudent(student)
            .success(function (data) {
                console.log('RESPONSE', JSON.stringify(data));
                $scope.success = true;
                $scope.key = BlockCVSvc.lastKey || "No Key";
            })
            .error(function (error) {
                alert(JSON.stringify(error));
            });
    };
}]);

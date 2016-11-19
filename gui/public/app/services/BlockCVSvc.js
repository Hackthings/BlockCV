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

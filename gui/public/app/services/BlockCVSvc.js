app.factory("BlockCVSvc", ['$http', function ($http) {
    var self = this;
    self.config = {};

    $http.get("config.json")
        .success(function (config) {
            self.config = config || {};
            console.log(self.config);
        });
    var address = "http://localhost:7050/chaincode";
    var ccaddress = "d12fcfdeaaacefa95887360eb6cda365675bb5d702d6633d245b428e3202727f237ac1e9a30e3e8ce846ec5f4d2aabd18a1070e884ff4054ca3044ce3ab705ec";

    self.grantAccess = function(args) {
        var requestArgs = {
            method: "invoke",
            function: "grant-access",
            args: [args.studentId, args.employerName],
            name: ccaddress,
        };
        var request = generateRequest(requestArgs);

        return $http.post(address, request);
    };

    self.createStudent = function(student) {
        var key = b64EncodeUnicode(student.name + student.dateofbirth);
        self.lastKey = key;
        var requestArgs = {
            method: "invoke",
            function: "create-student",
            args: [key, JSON.stringify(student)],
            name: ccaddress
        };
        var request = generateRequest(requestArgs);

        return $http.post(address, request);
    };

    self.getStudent = function (studentId) {
        var requestArgs = {
            method: "query",
            function: "student-get",
            args: [studentId],
            name: ccaddress
        };
        var request = generateRequest(requestArgs);
        console.log(address);
        return $http.post(address, request);
    };

    self.getStudentEmployer = function(args) {
        var requestArgs = {
            method: "query",
            function: "employer-get",
            args: [args.studentId, args.employerName],
            name: ccaddress
        };
        var request = generateRequest(requestArgs);

        return $http.post(address, request);
    };

    self.addQualification = function(args) {
        var requestArgs = {
            method: "invoke",
            function: "add-qualification",
            args: [args.studentId, args.qualification],
            name: ccaddress
        };
        var request = generateRequest(requestArgs);

        return $http.post(address, request);
    };

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
                    "args":[]
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
            //request.params.ctorMsg.args.unshift(args.function || 'dummy');
            request.params.ctorMsg.function = args.function;
        }

        var date = new Date();
        request.id = date.getTime();
        console.log(JSON.stringify(request, null, 4));

        return request;
    }

    return  self;

    function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }
}]);

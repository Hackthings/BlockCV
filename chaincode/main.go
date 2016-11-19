package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/hyperledger/fabric/core/chaincode/shim"
)

type BlockCV struct{}

func (bc *BlockCV) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	if function == "create-student" {
		myStudent := new(Student)
		myStudent.Name = "Dan"
		myStudent.DateOfBirth = "2000/01/01"
		myStudent.AccessList = []string{}
		myStudent.Qualifications = []*Qualification{}
		storeStudent(stub, "1", myStudent)
		fmt.Print(getStudent(stub, "1"))
		return ([]byte(myStudent.Name)), nil
	}
	return nil, nil
}

func (bc *BlockCV) Query(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	// This returns a Student Object with the key
	function = strings.ToLower(function)
	switch function {
	case "student-get":
		//args [0] means the student key
		if len(args) < 1 {
			return nil, errors.New("Missing arguments, expecting at least 1")
		}
		return stub.GetState(args[0])
	case "employer-get":
		//args[0] means the student key
		//args[1] means the name of the employer
		if len(args) < 2 {
			return nil, errors.New("Missing arguments, expecting 2")
		}
		student, err := getStudent(stub, args[0])
		if err != nil {
			return nil, err
		}
		for _, value := range student.AccessList {
			if args[1] == value {
				return stub.GetState(args[0])
			}
		}

		return []byte("Not Authorised"), nil
	}

	return nil, errors.New("Function was not understood")
}

func getStudent(stub shim.ChaincodeStubInterface, key string) (*Student, error) {
	sb, err := stub.GetState(key)
	if err != nil {
		return nil, err
	}

	student := new(Student)
	err = json.Unmarshal(sb, student)
	if err != nil {
		return nil, err
	}

	return student, nil
}

func storeStudent(stub shim.ChaincodeStubInterface, key string, student *Student) error {

	sj, err := json.Marshal(student)
	if err != nil {
		return err
	}

	return stub.PutState(key, sj)
}

func (bc *BlockCV) Invoke(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	function = strings.ToLower(function)
	switch function {
	case "create-student":
		//args[0] means the student key
		//args[1] means the json of the new student
		if len(args) < 2 {
			return nil, errors.New("Missing arguments, expecting 2")
		}
		studentKey := args[0]
		err := stub.PutState(studentKey, []byte(args[1]))
		if err != nil {
			return nil, err
		}
		break
	case "add-qualification":
		//args[0] means student key
		//args[1] means json of the new qualification
		if len(args) < 2 {
			return nil, errors.New("Missing arguments, expecting 2")
		}

		student, err := getStudent(stub, args[0])
		if err != nil {
			return nil, err
		}
		q := new(Qualification)

		err = json.Unmarshal([]byte(args[1]), q)
		if err != nil {
			return nil, err
		}

		student.Qualifications = append(student.Qualifications, q)

		err = storeStudent(stub, args[0], student)
		if err != nil {
			return nil, err
		}
		break
	case "grant-access":
		//args[0] means the student key
		//args[1] means the name of the employer to add to our current collection of granted employers
		if len(args) < 2 {
			return nil, errors.New("Missing arguments, expecting 2")
		}
		student, err := getStudent(stub, args[0])
		if err != nil {
			return nil, err
		}
		student.AccessList = append(student.AccessList, args[1])
		err = storeStudent(stub, args[0], student)
		if err != nil {
			return nil, err
		}
	}

	return nil, errors.New("Function was not understood")
}

func main() {
	err := shim.Start(new(BlockCV))
	if err != nil {
		fmt.Printf("Error starting BlockCV: %s", err)
	}
}

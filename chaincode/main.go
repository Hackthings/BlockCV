package main

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
)

type BlockCV struct{}

func (bc *BlockCV) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	return nil, nil
}

func (bc *BlockCV) Query(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	// This returns a Student Object with the key

	return rangeQ(stub)

	switch function {
	case "student-get":
		return stub.GetState(args[0])
	case "employer-get":
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
	/*jsonKeys, err := json.Marshal(args)
	if err != nil {
		return nil, fmt.Errorf("keys operation failed. Error marshaling JSON: %s", err)
	}
	err = stub.PutState(function, jsonKeys)
	if err != nil {
		return nil, err
	}
	*/
	switch function {
	case "create-student":
		studentKey := args[0]
		err := stub.PutState(studentKey, []byte(args[1]))
		if err != nil {
			return nil, err
		}
		break
	case "add-qualification":
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

func rangeQ(stub shim.ChaincodeStubInterface) ([]byte, error) {
	keysIter, err := stub.RangeQueryState("", "")
	if err != nil {
		return nil, fmt.Errorf("keys operation failed. Error accessing state: %s", err)
	}
	defer keysIter.Close()

	var keys []string
	for keysIter.HasNext() {
		key, _, err := keysIter.Next()
		if err != nil {
			return nil, fmt.Errorf("keys operation failed. Error accessing state: %s", err)
		}
		keys = append(keys, key)
	}
	keys = append(keys, "Test Value")
	jsonKeys, err := json.Marshal(keys)
	if err != nil {
		return nil, fmt.Errorf("keys operation failed. Error marshaling JSON: %s", err)
	}

	return []byte(jsonKeys), nil
}

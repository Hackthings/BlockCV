package main

import (
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
)

type BlockCV struct{}

func (bc *BlockCV) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	return nil, nil
}

func (bc *BlockCV) Query(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	return nil, nil
}

func (bc *BlockCV) Invoke(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	return nil, nil
}

func main() {
	err := shim.Start(new(BlockCV))
	if err != nil {
		fmt.Printf("Error starting BlockCV: %s", err)
	}
}

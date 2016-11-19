package main

//Represents qualifications of a student
type Qualification struct {
	Insititution string `json:"institution"`
	Course       string `json:"course"`
	Year         int    `json:"year"`
	Grade        string `json:"grade"`
}

//Represents the student object
type Student struct {
	Name           string           `json:"name"`
	DateOfBirth    string           `json:"dateofbirth"`
	Qualifications []*Qualification `json:"qualifications"`
	AccessList     []string         `json:"accesslist"`
}

//Represents the employer object
type Employer struct {
	Name string
}

package main

//Represents qualifications of a student
type Qualification struct {
	Insititution string
	Course       string
	Year         int
	Grade        string
}

//Represents the student object
type Student struct {
	ID             int
	Name           string
	DateOfBirth    string
	Qualifications []*Qualification
	AccessList     []string
}

//Represents the employer object
type Employer struct {
	ID   int
	Name string
}

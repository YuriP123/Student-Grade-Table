/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.
 */
/***********************
 * student_array - global array to hold student objects
 * type {Array}
 * example of student_array after input:
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var studentArray = [];
var gradeAverage;

/***************************************************************************************************
 * initializeApp
 * params {undefined} none
 * returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */

function initializeApp() {
      //gets all event handlers activated
      handleAddClicked();
}


/***************************************************************************************************
 * addClickHandlerstoElements
 * params {undefined}
 * returns  {undefined}
 *
 */
function addClickHandlersToElements() {


}


/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * param {object} event  The event object from the click
 * return: 
       none
 */
function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n); //function to check if name contains a number
}
function handleAddClicked(){
      //checks if the names are valid
      $('#add').click(function(){
            nameCheck = $("#s-name-input").val();
            courseCheck = $("#s-course-input").val();
            gradeCheck = $("#s-grade-input").val();

            //Exception handling
            if(isNumeric(nameCheck)==false){
                  addStudent(nameCheck,courseCheck,gradeCheck);
            }
      });
}


/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * param: {undefined} none
 * returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick() {


}


/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * param {undefined} none
 * return undefined
 * calls clearAddStudentFormInputs, updateStudentList
 */

 //function to create student object
function studentObject(name,course,grade){
      alert("student Object function called");
      this.name = name;
      this.course = course;
      this.grade = grade;
}

function addStudent(stdName,stdCourse,stdGrade) {
      alert("add student function called");
      /*alert("The name is: " + stdName);
      alert("The course is: " + stdCourse);
      alert("The name is: " + stdGrade);*/

      //this student variable will contain all info using the studentObject function
      var student = new studentObject(stdName,stdCourse,stdGrade);
      studentArray.push(student);
      alert("student name of element 0 is: " + studentArray[0].name);
}


/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(click) {


}

/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(newStudent) {


}


/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * param students {array} the array of student objects
 * returns {undefined} none
 * calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(newStudent) {


}


/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * param: {array} students  the array of student objects
 * returns {number}
 */
function calculateGradeAverage(student_array) {


}


/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * param: {number} average    the grade average
 * returns {undefined} none
 */
function renderGradeAverage(gradeAverage) {


}

/***************************************************************************************************
 * removeStudent - remove a student from the array
 * param {undefined} none
 * return undefined
 * calls updateStudentList
 */
function removeStudent() {}

/* Listen for the document to load and initialize the application*/
$(document).ready(initializeApp);

/* Define all global variables here. */
var studentArray = [];
var cancelbutton = '<button id="delete-btn" class="btn btn-danger">Delete</button>'

/***************************************************************************************************
 * initializeApp
 * params {undefined} none
 * returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */

function initializeApp() {
      //gets all event handlers activated
      handleAddClicked();
      handleCancelClick();
      handleDeleteClick();
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
            if(isNumeric(nameCheck)==false || Number(gradeCheck)<=100 || nameCheck == ""|| courseCheck == "" || gradeCheck == ""){
                  addStudent(nameCheck,courseCheck,gradeCheck);
            }
            else{
                  alert("Invalid Input");
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
      $('#cancel-btn').click(function(){
            clearAddStudentFormInputs();
      });
}


/***************************************************************************************************
 * handleDeleteClick - Event Handler when user clicks the delete button, should completely delete that row in the SGT
 * param: {undefined} none
 * returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleDeleteClick() {
      $(document).on("click", "#delete-btn", function(){
            removeStudent();
        });
}



/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * param {undefined} none
 * return undefined
 * calls clearAddStudentFormInputs, updateStudentList
 */

 //function to create student object
function studentObject(name,course,grade){
      //this function takes the valid data from user and compacts it into one super variable 
      this.name = name;
      this.course = course;
      this.grade = grade;
}

function addStudent(stdName,stdCourse,stdGrade) {
      //this student variable will contain all info using the studentObject function
      var student = new studentObject(stdName,stdCourse,stdGrade);

      //add the student into the list of all students
      studentArray.push(student);
      console.log(studentArray);
      updateStudentList();
}


/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs() {
      let btnClear = document.querySelector('#cancel-btn');
      let inputs = document.querySelectorAll('input');
      
      inputs.forEach(input =>  input.value = '');
}

/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * param {object} studentObj a single student object with course, name, and grade inside
 */

function renderStudentOnDom(newStudent) {
      console.log("renderstudentondom is called");
      //variables that refers the table in the html file
      var table = document.getElementById("tblEntAttributes");
      var rowCount = table.rows.length;
      arrayLength = studentArray.length;
      

      for(i=rowCount-1; i>=1;i--){
            table.deleteRow(i);
      }
      //insert the info in the 3 cells in each row
      for(var i=0; i<arrayLength; i++){
            var row = table.insertRow(i+1);
            row.insertCell(0).innerHTML= studentArray[i].name;
            row.insertCell(1).innerHTML= studentArray[i].course;
            row.insertCell(2).innerHTML= studentArray[i].grade;
            row.insertCell(3).innerHTML= cancelbutton;
      }
}


/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * param students {array} the array of student objects
 * returns {undefined} none
 * calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(newStudent) {
      console.log("update student list called");
      renderStudentOnDom();
      calculateGradeAverage();

}


/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * param: {array} students  the array of student objects
 * returns {number}
 */
function calculateGradeAverage() {
      var total = 0;
      var count = 0;
      var gradeAverage;

      //goes through every grade in the array and calulates the average
      for(i=0;i<studentArray.length;i++){
            total = total + Number(studentArray[i].grade);
            count++;
      }
      gradeAverage = total/count;
      gradeAverage.toFixed(2);

      //calling function to output the average
      renderGradeAverage(gradeAverage);
}


/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * param: {number} average    the grade average
 * returns {undefined} none
 */
function renderGradeAverage(gradeAverage) {
      //outputs the updated grade average on the webpage
      console.log("rendergradeaverage called");
      $('small').html("GPA: " + gradeAverage);

}

/***************************************************************************************************
 * removeStudent - remove a student from the array
 * param {undefined} none
 * return undefined
 * calls updateStudentList
 */
function removeStudent(){
      var index;
      var table = document.getElementById("tblEntAttributes");
      var rowLength = table.rows.length;
      for(var i = +1; i < rowLength; i++){
            table.rows[i].cells[3].onclick = function(){
                  index = this.parentElement.rowIndex;
                  studentArray.splice(index-1,1);
                  table.deleteRow(index);
            }
      }
}

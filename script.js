/* Listen for the document to load and initialize the application*/
$(document).ready(initializeApp);

/* Define all global variables here. */
var studentArray = [];
var isEmpty = true;
var cancelbutton = '<button class="delete-btn btn btn-danger">Delete</button>'
var updatebutton = '<button class="update-btn btn btn-info">Update</button>'

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
      handleUpdateClick();
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * param {object} event  The event object from the click
 * return: 
       none
 */
function handleAddClicked(){
      //checks if the names are valid
      $('#add').click(function(){
            var nameCheck = $("#s-name-input").val();
            var courseCheck = $("#s-course-input").val();
            var gradeCheck = $("#s-grade-input").val();

            //Exception handling
            if(/\d/.test(nameCheck)==true || Number(gradeCheck)>100 || nameCheck == "" || courseCheck == "" || gradeCheck == ""){
                  $('#std-form').addClass('animated shake');
                  setTimeout(function() { 
                        $('#std-form').removeClass('animated shake');
                    }, 1000);
            }
            else{
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
      $('#tb1Body').on("click", ".delete-btn", function(){
            var trIndex = $(this).closest('tr').index();
            $(this).closest('tr').remove();
            removeStudent(trIndex);
      });
}

/***************************************************************************************************
 * handleUpdateClick - Event Handler when user clicks the update button, should update that row in the SGT
 * param: {undefined} none
 * returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleUpdateClick(){
      $('#tb1Body').on("click", ".update-btn", function(){
            var trIndexupdate = $(this).closest('tr').index();
            var nameUpdate = '<input type="text" id="name-update" required>'
            var courseUpdate = '<input type="text" id="course-update" required>'
            var gradeUpdate = '<input type="number" id="grade-update" required>'
            var addBtn = '<button id="add-update" type="button" class="btn btn-success" name="addBtn"> Confirm </button>'
            var cancelBtn = '<button id="cancel-update" type="button" class="btn btn-danger">Cancel</button>'
            
            $(this).closest('tr').replaceWith( "<tr><td>"+ nameUpdate +"</td><td>"+courseUpdate+"</td><td>"+gradeUpdate+"</td><td> "+addBtn+"</td><td>"+cancelBtn+"</td></tr>");
            $('#name-update').val(studentArray[trIndexupdate].name);
            $('#course-update').val(studentArray[trIndexupdate].course);
            $('#grade-update').val(studentArray[trIndexupdate].grade);

            $('#add-update').click(function(){
                  var stdNameNew = $("#name-update").val();
                  var stdCourseNew = $("#course-update").val()
                  var stdGradeNew = $("#grade-update").val()

                  if(/\d/.test(stdNameNew)==true || Number(stdGradeNew)>100 || stdNameNew == "" || stdCourseNew == "" || stdGradeNew == ""){
                        $(this).closest('tr').addClass('animated shake');
                        setTimeout(function() { 
                              $(trIndexupdate).removeClass('animated shake');
                          }, 1000);
                  }
                  else{
                        studentArray[trIndexupdate].name = stdNameNew;
                        studentArray[trIndexupdate].course = stdCourseNew;
                        studentArray[trIndexupdate].grade = stdGradeNew;
                        updateStudentList();
                  }
            });

            $('#cancel-update').click(function(){
                  updateStudentList();
            });

      });
}



/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * param {undefined} none
 * return undefined
 * calls clearAddStudentFormInputs, updateStudentList
 */

function addStudent(stdName,stdCourse,stdGrade) {
      //this student variable will contain all info using the studentObject function
      var student = {
            name: stdName,
            course: stdCourse,
            grade: stdGrade
        };

      //add the student into the list of all students
      studentArray.push(student);
      // clearAddStudentFormInputs()
      updateStudentList();
}


/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs() {
      $('#s-name-input').val('');
      $('#s-course-input').val('');
      $('#s-grade-input').val('');
}

/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * param {object} studentObj a single student object with course, name, and grade inside
 */

function renderStudentOnDom(newStudent) {
      //variables that refers the table in the html file
      var arrayLength = studentArray.length;
      
      if(isEmpty == false){
            for(var i=arrayLength-1; i>-1;i--){
                  $("#tb1Body tr").remove(); 
            }
      }

      //insert the info in the 3 cells in each row
      for(var i=0; i<arrayLength; i++){
            isEmpty = false;    
            $('#tb1Body').append("<tr><td>"+studentArray[i].name+"</td><td>"+studentArray[i].course+"</td><td>"+studentArray[i].grade+"</td><td>"+cancelbutton+"<td>"+updatebutton+"</td></tr>");
      }
      
      $('#tblAttributes tr:last').addClass('animated fadeInUp');
}


/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * param students {array} the array of student objects
 * returns {undefined} none
 * calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList() {
      renderStudentOnDom();
      calculateGradeAverage();
}


/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * returns {number}
 */
function calculateGradeAverage() {
      var totalGrade = 0;
      var countGrade = 0;
      var gradeAverage;

      //goes through every grade in the array and calulates the average
      for(i=0;i<studentArray.length;i++){
            totalGrade = totalGrade + Number(studentArray[i].grade);
            countGrade++;
      }
      gradeAverage = totalGrade/countGrade;

      //calling function to output the average
      renderGradeAverage(Math.round(gradeAverage));
}


/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * param: {number} average    the grade average
 * returns {undefined} none
 */
function renderGradeAverage(gradeAverage) {
      //outputs the updated grade average on the webpage
      $('.gradeHeader span').html(gradeAverage);

}

/***************************************************************************************************
 * removeStudent - remove a student from the array
 * param {undefined} none
 * return undefined
 * calls updateStudentList
 */
function removeStudent(index){
      console.log(index);
      studentArray.splice(index,1);
      calculateGradeAverage();
}

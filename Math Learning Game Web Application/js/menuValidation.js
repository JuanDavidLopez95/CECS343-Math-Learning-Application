/* Get Dynamic Elements */

//Holds the input box element where the player types in his name
var playerName = document.getElementById("nameInput");
var userArray = [];
populateHighScoresTable();

var difficultyLevelRadioButton = document.forms["difficultyLevelForm"]["level-options"];
var difficultyLevelRadioButton_Checked = document.querySelector('input[name="level-options"]:checked');


function difficultyLevelRadioButtonChecked() {
	var difficultyLevelRadioButtonOption;
		difficultyLevelRadioButtonOption = document.querySelector('input[name="level-options"]:checked');

	return difficultyLevelRadioButtonOption;
} 


/* Get the type of math buttons */
var mathTypeButton = document.getElementsByClassName("mathType-button");
var additionButton = document.getElementById("addition-Button");
var subtractionButton = document.getElementById("subtraction-Button");
var multiplicationButton = document.getElementById("multiplication-Button");
var divisionButton = document.getElementById("division-Button");
document.getElementById("highscore-Button").addEventListener("click", function() {
	window.location.href = "/index.html#openModal";
});
document.getElementById("main-Menu-Button").addEventListener("click", function() {window.location.href = "/index.html";});

additionButton.addEventListener('click', function(event) {
		console.log("Swag Value: " + additionButton.value);
        initializeGame(additionButton);
	}); 

subtractionButton.addEventListener('click', function(event) {
		console.log("Swag Value: " + subtractionButton.value);
		initializeGame(subtractionButton);
	}); 

multiplicationButton.addEventListener('click', function(event) {
		console.log("Swag Value: " + multiplicationButton.value);
		initializeGame(multiplicationButton);
	}); 

divisionButton.addEventListener('click', function(event) {
		console.log("Swag Value: " + divisionButton.value);
		initializeGame(divisionButton);
	}); 


function initializeGame(mathTypeSpecificButton) {
	var mathTypeValue = mathTypeSpecificButton;
	console.log("A Math Type Button Was Clicked.");
    validateInputs(mathTypeValue); 
} 


/* Check to see if the player name input box is empty and/or
   a difficulty level hasn't been selected. Returns an error
   prompting the user to do select the said options.  */
function validateInputs(mathTypeSpecificButton) {
	var mathTypeSwag = mathTypeSpecificButton;
	if (!checkPlayerName()) {
		document.getElementById("nameInput-errorMessage").style.display = "inline-block";
	} else {
		document.getElementById("nameInput-errorMessage").style.display = "none";
	} 

	if (!checkDifficultyLevel()) {
		console.log("Please choose a difficulty level");
		document.getElementById("difficultyLevel-errorMessage").style.display = "inline-block";
	} else {
		document.getElementById("difficultyLevel-errorMessage").style.display = "none";
	} 

	if (checkPlayerName() && checkDifficultyLevel()) {
		console.log("Change to gameRun");
		var userInfo = {}; 
		userInfo.userName = playerName.value;
		userInfo.difficultyLevel =  document.querySelector('input[name="level-options"]:checked').value;
		userInfo.mathType = mathTypeSwag.value;
		userInfo.time = -1;

		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		console.log("cookie = " + JSON.stringify(userInfo));
		window.location.pathname = "/gameRun.html";

		console.log("Math Value of button: " + mathTypeSwag.value);
		console.log(typeof mathTypeSwag.value);
	} 

} 

function checkPlayerName() {
	if (playerName.value == "" || playerName.value === null || 
		playerName.value.length == 0 || isEmpty(playerName.value) == true ) {
		return false;
	} 
	if (playerName.value !== "" || playerName.value !== null || 
		playerName.value.length != 0 || isEmpty(playerName.value) == false ) {
		return true;
	} 
}

/* Checks to see if there is whitespace in an element
   like an input field. Returns true if the field is empty.
*/
function isEmpty(str){
    return !str.replace(/^\s+/g, '').length; 
} 


/* Checks if a difficulty level has been selected or not. */
function checkDifficultyLevel() {
	var diffLevelRadioButton = document.forms["difficultyLevelForm"]["level-options"];
	var diffLevelFormLength = diffLevelRadioButton.length;
	var levelChosen = null;

	for (var i = 0; i < diffLevelFormLength; i++) {
		if (diffLevelRadioButton[i].checked) {
			levelChosen = diffLevelRadioButton[i].value;
		} 
	} 

	if (levelChosen == null) {
		return false;
	} 

	else {
		return true;
	} 
} 

function returnDifficultyLevel() {
	return difficultyLevelRadioButton_Checked.value;	
}
function separateUserData(){
    var data = localStorage.getItem("highscoresList");
    userArray = data.split(",");
}
function compare(user1, user2){
    var data1 = user1.split(" ");
    var data2 = user2.split(" ");
    if (parseInt(data1[4]) < parseInt(data2[4])) { return -1;}
    if (parseInt(data1[4]) > parseInt(data2[4])) { return 1;}
    return 0;
}
function getTop10(){
    separateUserData();
    userArray.sort(compare);
}
function populateHighScoresTable(){
    getTop10();
    for (var i = 0; i < 10; i++){
        if (userArray.length > i){
            var d = userArray[i];
            var data = d.split(" ");
            console.log(data);
            var name = data[0];
            console.log(name);
            var level = data[1];
            console.log(level);
            var mathType = data[2];
            console.log(mathType);
            var time = data[3];
            console.log(time);
            var nameTable = "user-name" + i.toString();
            var lvlTable = "user-lvl" + i.toString();
            var typeTable = "user-type" + i.toString();
            var timeTable = "user-time" + i.toString();
            document.getElementById(nameTable).textContent = name;
            document.getElementById(lvlTable).innerHTML = level;
            document.getElementById(typeTable).innerHTML = convertMathType(mathType);
            document.getElementById(timeTable).innerHTML = time;
         }
    }
}
function convertMathType(type){
	if (type == "+") { return "Addition";}
	else if (type == "-") { return "Subtraction";}
	else if (type == "*") { return "Multiplication"; }
	else { return "Division"; }
}

$(document).ready( startApp );

var numberExchangeCode = '';

function startApp(){
	applyClickHandlers();
	getExchangeCode();
}

function applyClickHandlers(){
	$("#guessButton").click( makeGuess );
}

function getExchangeCode(){
	$.ajax({
		url: '/generateNumber',
		dataType: 'json',
		data: {
			min: 1,
			max: 10
		}
	}).then( function (response) {
		if (response.success) {
			numberExchangeCode = response.code;
		}
	})
}

function getCurrentNumber() {
	return $.ajax({
		method: 'post',
		url: 'getNumber.php',
		dataType: 'json',
		data: {
			exchangeCode: numberExchangeCode,
		}
	});
}

function displayMessage(message){
	$("#display").text(message);
}

function makeGuess(){
	//returns a thenable object/function
	getCurrentNumber().then( function (response) {
		var randomNumber = parseInt(response.number);
		var userGuess = parseInt($('#userGuess').val())

		if(randomNumber < userGuess){
			displayMessage('too high');s
		} else if(randomNumber > userGuess){
			displayMessage('too low');
		} else {
			displayMessage(' got it');
		}
		$("#userGuess").val('');
	});
	
}
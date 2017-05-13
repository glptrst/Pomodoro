"use strict"
window.onload = function () {
    //store intervalID;
    var pomodoroCountdown;

    // Sound
    var buzzer = document.getElementById('buzzer');

    // Call startCountDown when pomodoro start button is clicked 
    document.getElementById("startPomodoro").addEventListener('click', function startCountDown() {
	// Pomodoro digits html Element
	var pomodoroDigitsEl = document.getElementById("pomodoroDigits"); 
	// Pomodoro digits text node
	var pomodoroDigitsTextNode = pomodoroDigitsEl.lastChild;  
	// Pomodoro digits string (nodevalue)
	var pomodoroDigitsString = pomodoroDigitsTextNode.nodeValue;

	var minutes = Number(pomodoroDigitsString.slice(0,2)); 
	var seconds = Number(pomodoroDigitsString.slice(3,5));
	var totalSeconds = minutes*60 + seconds;

	//Every second call updateDigits
	pomodoroCountdown = setInterval( function updateDigits() { 
	    // Update digits string
	    totalSeconds -= 1;
	    if (totalSeconds < 1) {
		//Stop calling updateDigits every second
		clearInterval(pomodoroCountdown);

		// Play a sound
		buzzer.play();
	    }
	    var newMinutes = Math.floor(totalSeconds / 60);
	    var newSeconds = totalSeconds % 60;
	    // Always display minutes and seconds in a two-digit format
	    if (String(newMinutes).length < 2)
		newMinutes = '0' + newMinutes;
	    if (String(newSeconds).length < 2)
		newSeconds = '0' + newSeconds;
	    // Create updated digits string 
	    var newDigitsString = newMinutes + ':' + newSeconds;
	    // **********Change string in the page**********
	    // Create new text node
	    var newTextNode = document.createTextNode(newDigitsString);
	    //replace old text node with the new one
	    pomodoroDigitsEl.replaceChild(newTextNode, pomodoroDigitsTextNode);
	    // Make new node the current node (so the replacement occurs correctly in the next call)
	    pomodoroDigitsTextNode = newTextNode;
	}, 1000);
    });

    document.getElementById("stopPomodoro").addEventListener('click', function stopCountDown() {
	clearInterval(pomodoroCountdown);
    });

    document.getElementById("resetPomodoro").addEventListener('click', function resetPomodoro() {
	//Check if we can avoid re-declaring the variables below
	// TODO

	// Pomodoro digits html Element
	var pomodoroDigitsEl = document.getElementById("pomodoroDigits"); 
	// Pomodoro digits text node
	var pomodoroDigitsTextNode = pomodoroDigitsEl.lastChild;  
	// Pomodoro digits string (nodevalue)
	var pomodoroDigitsString = pomodoroDigitsTextNode.nodeValue;
	clearInterval(pomodoroCountdown); // in case the countdown is active
	var newTextNode = document.createTextNode('25:00');
	pomodoroDigitsEl.replaceChild(newTextNode, pomodoroDigitsTextNode);
	pomodoroDigitsTextNode = newTextNode;
    });

    document.getElementById("pomodoroPlus").addEventListener('click', function increasePomodoro() {
	// Pomodoro digits html Element
	var pomodoroDigitsEl = document.getElementById("pomodoroDigits"); 
	// Pomodoro digits text node
	var pomodoroDigitsTextNode = pomodoroDigitsEl.lastChild;  
	// Pomodoro digits string (nodevalue)
	var pomodoroDigitsString = pomodoroDigitsTextNode.nodeValue;

	var minutes = Number(pomodoroDigitsString.slice(0,2)); 
	var seconds = Number(pomodoroDigitsString.slice(3,5));
	minutes += 1;
	if (String(minutes).length < 2)
	    minutes = '0' + minutes;
	if (String(seconds).length < 2)
	    seconds = '0' + seconds;

	var decreased = document.createTextNode(minutes + ':' + seconds);
	pomodoroDigitsEl.replaceChild(decreased, pomodoroDigitsTextNode);
	pomodoroDigitsTextNode = decreased;
    });

    document.getElementById("pomodoroMinus").addEventListener('click', function decreasePomodoro() {
	// Pomodoro digits html Element
	var pomodoroDigitsEl = document.getElementById("pomodoroDigits"); 
	// Pomodoro digits text node
	var pomodoroDigitsTextNode = pomodoroDigitsEl.lastChild;  
	// Pomodoro digits string (nodevalue)
	var pomodoroDigitsString = pomodoroDigitsTextNode.nodeValue;

	var minutes = Number(pomodoroDigitsString.slice(0,2)); 
	var seconds = Number(pomodoroDigitsString.slice(3,5));
	minutes -= 1;
	if (String(minutes).length < 2)
	    minutes = '0' + minutes;
	if (String(seconds).length < 2)
	    seconds = '0' + seconds;

	var decreased = document.createTextNode(minutes + ':' + seconds);
	pomodoroDigitsEl.replaceChild(decreased, pomodoroDigitsTextNode);
	pomodoroDigitsTextNode = decreased;
    });
}

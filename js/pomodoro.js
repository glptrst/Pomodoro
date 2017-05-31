"use strict";
window.onload = function () {
    // Task 
    var task;

    // Store timeoutID;
    var pomodoroCountdown;

    // Sound
    var buzzer = document.getElementById('buzzer');

    // Flag for pomodoro
    var pomodoroIsOn = false;
    // Flag for wheter pomodoro has been stopped or not
    var pomodoroStopped = false;

    // Store number of done pomodoros
    var nthPomodoro = 0;
    
    // Store time when a pomodor begins
    var beginningTime = null; 

    // Store last button hit in form of string ('start', 'stop', 'reset')
    var lastButtonHit = null;

    // Call startCountDown when pomodoro start button is clicked 
    document.getElementById("startPomodoro").addEventListener('click', function startCountDown() {
	// Pomodoro digits html Element
	var pomodoroDigitsEl = document.getElementById("pomodoroDigits"); 
	// Pomodoro digits text node
	var pomodoroDigitsTextNode = pomodoroDigitsEl.lastChild;  
	// Pomodoro digits string (nodevalue)
	var pomodoroDigitsString = pomodoroDigitsTextNode.nodeValue;

	if (pomodoroDigitsString === '00:00') { // If counter is 00.00
	    ; // Do nothing
	} else if (pomodoroIsOn) {
	    ; // Do nothing
	}
	else { // Start pomodoro

	    // Change flag1
	    pomodoroIsOn = true;

	    if (pomodoroStopped === false) {
		// Set beginning time of pomodoro
		(function setBeginningTime() {
		    var timeNow = new Date();
		    var hours   = timeNow.getHours();
		    var minutes = timeNow.getMinutes();
		    var seconds = timeNow.getSeconds();
		    beginningTime = hours + ':' + minutes + ':' + seconds;
		})();
		// Increase number of done pomodoros
		nthPomodoro++;
	    }
	    // Set task variable
	    task = document.getElementById('task').value;

	    var minutes = Number(pomodoroDigitsString.slice(0,2)); 
	    var seconds = Number(pomodoroDigitsString.slice(3,5));
	    var totalSeconds = minutes*60 + seconds;

	    // Hide minus and plus
	    var minus = document.getElementById('pomodoroMinus');  
	    minus.style.display = 'none';
	    var plus = document.getElementById('pomodoroPlus');  
	    plus.style.display = 'none';

	    // Instead of simply using setInterval:
	    // Accurate timer: https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
	    var interval = 1000; //ms
	    var expected = Date.now() + interval;
	    pomodoroCountdown = setTimeout(step, interval);
	    function step() {
		var dt = Date.now() - expected; //the drift
		if (dt > interval) {
		    // if we are here ... 
		    // probably the computer has been suspended without stopping the pomodoro
		    // so we simply stop the pomodoro 
		    pomodoroIsOn = false;
		    return;
		}
		// Update digits string
		totalSeconds -= 1;
		if (totalSeconds < 0) {
		    // Play a sound
		    buzzer.play();

		    // Remove 'none' from completed tasks (if it's the first pomodoro to be completed)
		    if (nthPomodoro === 1) {
			var none = document.getElementById('none');
			none.remove();
		    }
		    // Get time when task is finished 
		    var timeNow = new Date();
		    var hours   = timeNow.getHours();
		    var minutes = timeNow.getMinutes();
		    var seconds = timeNow.getSeconds();
		    var nowString = hours + ':' + minutes + ':' + seconds;
		    
		    //show table element (which is set to display: none when empty)
		    var tableDiv = document.getElementById('tableDiv');
		    tableDiv.setAttribute('style', ' ');
		    // new table row
		    var newTr = document.createElement('tr');
		    // new table datas to put into the new row
		    // ordinal number of pomodoro
		    var numberTd = document.createElement('th');
		    numberTd.setAttribute('scope', 'row');
		    var numberText = document.createTextNode(String(nthPomodoro));
		    numberTd.appendChild(numberText);
		    //task
		    var taskTd = document.createElement('td');  
		    var taskText = document.createTextNode(task); 
		    taskTd.appendChild(taskText);
		    //length
		    var lengthTd = document.createElement('td');  
		    var lengthText = document.createTextNode(pomodoroDigitsString); 
		    lengthTd.appendChild(lengthText);
		    //stopped 
		    var stopped = pomodoroStopped ? 'yes' : 'no';
		    var stoppedTd = document.createElement('td');  
		    var stoppedText = document.createTextNode(stopped); 
		    stoppedTd.appendChild(stoppedText);
		    //begun at
		    var begunAtTd = document.createElement('td');  
		    var begunAtText = document.createTextNode(beginningTime); 
		    begunAtTd.appendChild(begunAtText);
		    //finished at
		    var finishedAtTd = document.createElement('td');  
		    var finishedAtText = document.createTextNode(nowString); 
		    finishedAtTd.appendChild(finishedAtText);
		    // Append tds as childs to tr
		    newTr.appendChild(numberTd);
		    newTr.appendChild(taskTd);
		    newTr.appendChild(lengthTd);
		    newTr.appendChild(stoppedTd);
		    newTr.appendChild(begunAtTd);
		    newTr.appendChild(finishedAtTd);
		    // Append new tr to table
		    var tableBody = document.getElementsByTagName('tbody')[0];
		    tableBody.appendChild(newTr);

		    pomodoroStopped = false;

		    // Stop countdown
		    return;
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
		// Replace old text node with the new one
		pomodoroDigitsEl.replaceChild(newTextNode, pomodoroDigitsTextNode);
		// Make new node the current node (so the replacement occurs correctly in the next call)
		pomodoroDigitsTextNode = newTextNode;

		expected += interval;
		pomodoroCountdown = setTimeout(step, Math.max(0, interval - dt)); // take drift into account
	    }
	}
    });

    // Stop countdown when stop is clicked 
    document.getElementById("stopPomodoro").addEventListener('click', function stopCountDown() {
	clearTimeout(pomodoroCountdown);
	pomodoroIsOn = false;
	pomodoroStopped = true;
    });

    // Reset pomodoro when reset is clicked
    document.getElementById("resetPomodoro").addEventListener('click', function resetPomodoro() {
	// Change flags
	pomodoroIsOn = false;
	pomodoroStopped = false;

	// Make minus and plus buttons visible (in the case their display property was set to 'none')
	var minus = document.getElementById('pomodoroMinus');  
	minus.style.display = '';
	var plus = document.getElementById('pomodoroPlus');  
	plus.style.display = '';

	// Pomodoro digits html Element
	var pomodoroDigitsEl = document.getElementById("pomodoroDigits"); 
	// Pomodoro digits text node
	var pomodoroDigitsTextNode = pomodoroDigitsEl.lastChild;  
	// Pomodoro digits string (nodevalue)
	var pomodoroDigitsString = pomodoroDigitsTextNode.nodeValue;
	clearTimeout(pomodoroCountdown); // in the case the countdown is active
	// Create new text node and replae old one
	var newTextNode = document.createTextNode('25:00');
	pomodoroDigitsEl.replaceChild(newTextNode, pomodoroDigitsTextNode);
    });

    // Increase pomodoro by one minute when click on plus
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
	if (minutes > 35) {
	    ; // You can't set a pomodoro to be more than 35 minutes! 
	} else {
	    // Always display minutes and seconds in a two-digit format
	    if (String(minutes).length < 2)
		minutes = '0' + minutes;
	    if (String(seconds).length < 2)
		seconds = '0' + seconds;
	    // Create new text node and replace the old one
	    var increased = document.createTextNode(minutes + ':' + seconds);
	    pomodoroDigitsEl.replaceChild(increased, pomodoroDigitsTextNode);
	}
    });

    // Decrease pomodoro by one minute when click on minus
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
	if (minutes < 1) {
	    ; //You can't set a pomodoro to be less than 1 minute!
	} else {
	    // Always display minutes and seconds in a two-digit format
	    if (String(minutes).length < 2)
		minutes = '0' + minutes;
	    if (String(seconds).length < 2)
		seconds = '0' + seconds;
	    // Create new text node and replace the old one
	    var decreased = document.createTextNode(minutes + ':' + seconds);
	    pomodoroDigitsEl.replaceChild(decreased, pomodoroDigitsTextNode);
	}
    });
};

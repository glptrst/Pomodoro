window.onload = function () {
    // Pomodoro digits Element
    var pomodoroDigitsEl = document.getElementById("pomodoroDigits"); 
    // Pomodoro digits text node
    var pomodoroDigitsTextNode = pomodoroDigitsEl.lastChild;  
    // Pomodoro digits string
    var pomodoroDigitsString = pomodoroDigitsTextNode.nodeValue;
   
    var minutes = Number(pomodoroDigitsString.slice(0,2)); 
    var seconds = Number(pomodoroDigitsString.slice(3,5));
    var totalSeconds = minutes*60 + seconds;

    document.getElementById("startPomodoro").addEventListener('click', function startcountDown() {

	//Every second call updateDigits
	var countdown = setInterval( function updateDigits() { 
	    // Update digits string
	    totalSeconds -= 1;

	    if (totalSeconds < 1) {
		clearInterval(countdown);
	    }

	    var newMinutes = Math.floor(totalSeconds / 60);
	    var newSeconds = totalSeconds % 60;
	    // Always display seconds in a two-digit format
	    if (String(newSeconds).length < 2) {
		newSeconds = '0' + newSeconds;
	    }
	    var newDigitsString = newMinutes + ':' + newSeconds;
	    // Change string (Should I do this without using inner.HTML?)
	    pomodoroDigitsEl.innerHTML = newDigitsString;

	}, 1000);
    });
}

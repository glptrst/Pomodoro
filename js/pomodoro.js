window.onload = function () {
    // Pomodoro digits string
    var pomodoroDigits = document.getElementById("pomodoroDigits").lastChild.nodeValue;

    var minutes = Number(pomodoroDigits.slice(0,2)); 

    var seconds = Number(pomodoroDigits.slice(3,5));

    var totalSeconds = minutes*60 + seconds;

    document.getElementById("startPomodoro").addEventListener('click', function startcountDown() {
	//Every second call updateDigits
	var countdown = setInterval( function updateDigits() { 
	    // Update digits string
	    totalSeconds -= 1;
	    var newMinutes = Math.floor(totalSeconds / 60);
	    var newSeconds = totalSeconds % 60;
	    // Always display seconds in a two-digit format
	    if (String(newSeconds).length < 2) {
		newSeconds = '0' + newSeconds;
	    }
	    var newDigitsString = newMinutes + ':' + newSeconds;

	    console.log(newDigitsString);
	}, 1000);
    });
    
    //var pomodoroSeconds = pomodoroDigits * 60;
    //console.log(pomodoroSeconds/60 + ":" + pomodoroSeconds%60);
}

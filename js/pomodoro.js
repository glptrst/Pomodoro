window.onload = function () {
    // Pomodoro digits html Element
    var pomodoroDigitsEl = document.getElementById("pomodoroDigits"); 
    // Pomodoro digits text node
    var pomodoroDigitsTextNode = pomodoroDigitsEl.lastChild;  
    // Pomodoro digits string (nodevalue)
    var pomodoroDigitsString = pomodoroDigitsTextNode.nodeValue;
   
    var minutes = Number(pomodoroDigitsString.slice(0,2)); 
    var seconds = Number(pomodoroDigitsString.slice(3,5));
    var totalSeconds = minutes*60 + seconds;

    document.getElementById("startPomodoro").addEventListener('click', function startCountDown() {

	//Every second call updateDigits
	var countdown = setInterval( function updateDigits() { 
	    // Update digits string
	    totalSeconds -= 1;
	    if (totalSeconds < 1) {
		//Stop calling updateDigits every second
		clearInterval(countdown);
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

	}, 1000);)
    });
}

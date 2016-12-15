function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}

function setAnswers() {
	var correctAnswer = document.getElementById("answer1").value;
	var wrongAnswer1 = document.getElementById("answer2").value;
	var wrongAnswer2 = document.getElementById("answer3").value;
	var wrongAnswer3 = document.getElementById("answer4").value;
	
	var answers = new Array([correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3]);
	
	shuffle(answers);
	
	document.getElementById("lbla").innerHTML = answers[0];
	document.getElementById("lblb").innerHTML = answers[1];
	document.getElementById("lblc").innerHTML = answers[2];
	document.getElementById("lbld").innerHTML = answers[3];
}

window.onload = setAnswers;
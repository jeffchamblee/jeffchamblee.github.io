"use strict";
var prospect_theory = {
	hideAnswers: function() {
	    $(".answer").css("display:none;");
	},
	displayAnswers: function() {
		//document.getElementById('answer').style.display='block'; 
		
		// show answers
	    $(".answer").css("display:block;");
	    $(".answer").css("color", "blue");
	    $("#answers_above").text("See above for answers");

		// question 1 
		var selectedRadio = $('input[name=decision_1]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer1").text("You chose maximizing utility over certainty");
		} else if (selectedRadio === '2') {
			$("#answer1").text("You chose certainty over maximizing utility");
		}
		// question 2
		var selectedRadio = $('input[name=decision_2]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer2").text("You chose maximizing utility over certainty");
		} else if (selectedRadio === '2') {
			$("#answer2").text("You chose certainty over maximizing utility");
		}
		// question 3
		var selectedRadio = $('input[name=decision_3]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer3").text("You chose maximizing utility over certainty");
		} else if (selectedRadio === '2') {
			$("#answer3").text("You chose certainty over maximizing utility");
		}
		// question 4
		var selectedRadio = $('input[name=decision_4]:checked', '#decision_problems').val();
		console.log(selectedRadio);
		if (selectedRadio === '1') {
			$("#answer4").text("You chose maximizing utility over certainty");
		} else if (selectedRadio === '2') {
			$("#answer4").text("You chose certainty over maximizing utility");
		}
		// question 5
		var selectedRadio = $('input[name=decision_5]:checked', '#decision_problems').val();
		console.log(selectedRadio);
		if (selectedRadio === '1') {
			$("#answer5").text("You chose maximizing utility over certainty");
		} else if (selectedRadio === '2') {
			$("#answer5").text("You chose certainty over maximizing utility");
		}

	}
};

$(document).ready(function() {
	prospect_theory.hideAnswers();
});

/*
    // event handlers
		$('#decision_1 input:radio').click(function() {
		});

*/
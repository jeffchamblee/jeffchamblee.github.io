"use strict";
var prospect_theory = {
	hideAnswers: function() {
	    $(".answer").css("display:none;");
	},
	displayAnswers: function() {
		//document.getElementById('answer').style.display='block'; 
		
		// show answers
	    $(".answer").css("display:block;");
	    $(".answer").css("color:blue;");
		// question 1 
		var selectedRadio = $('input[name=decision_1]:checked', '#decision_problems').val();
		console.log(selectedRadio);
		if (selectedRadio === '1') {
			$("#answer1").text("You chose maximizing utility over certainty");
		} else if (selectedRadio === '2') {
			$("#answer1").text("You chose certainty over maximizing utility");
		}
		// question 2
		selectedRadio = $('input[name=decision_2]:checked', '#decision_problems').val();
		console.log(selectedRadio);
		if (selectedRadio === '1') {
			$("#answer2").text("You chose maximizing utility over certainty");
		} else if (selectedRadio === '2') {
			$("#answer2").text("You chose certainty over maximizing utility");
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
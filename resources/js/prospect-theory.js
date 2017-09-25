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
		if ($('#decision_1 input:radio').val() === '1') {
			$("#answer1").text("You chose maximizing utility over certainty");
		} else if ($('#decision_1 input:radio').val() === '2') {
			$("#answer1").text("You chose certainty over maximizing utility");
		}
		// question 2
	    $("#answer2").text("Answer 2 ");
		if ($('#decision_2 input:radio').val() === '1') {
			$("#answer2").text("You chose maximizing utility over certainty");
		} else if ($('#decision_2 input:radio').val() === '2') {
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
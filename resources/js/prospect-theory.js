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
			$("#answer3").text("");
		} else if (selectedRadio === '2') {
			$("#answer3").text("");
		}
		// question 4
		var selectedRadio = $('input[name=decision_4]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer4").text("You chose maximizing utility over certainty");
		} else if (selectedRadio === '2') {
			$("#answer4").text("");
		}
		// question 5
		var selectedRadio = $('input[name=decision_5]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer5").text("");
		} else if (selectedRadio === '2') {
			$("#answer5").text("");
		}
		// question 6
		var selectedRadio = $('input[name=decision_6]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer6").text("You chose maximizing utility over certainty");
		} else if (selectedRadio === '2') {
			$("#answer6").text("");
		}
		// question 7
		var selectedRadio = $('input[name=decision_7]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer7").text("");
		} else if (selectedRadio === '2') {
			$("#answer7").text("");
		}
		// question 8
		var selectedRadio = $('input[name=decision_8]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer8").text("");
		} else if (selectedRadio === '2') {
			$("#answer8").text("");
		}
		// question 9
		var selectedRadio = $('input[name=decision_9]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer9").text("");
		} else if (selectedRadio === '2') {
			$("#answer9").text("");
		}
		// question 10
		var selectedRadio = $('input[name=decision_10]:checked', '#decision_problems').val();
		$("#answer10").text("In a situation where probabilities are relatively high, most people choose the prospect where winning is more probable over of the prospect that has a higher gain. 86% chose the second option. ");
		if (selectedRadio === '1') {
			$("#answer10").append("You chose higher winnings.");
		} else if (selectedRadio === '2') {
			$("#answer10").append("You chose higher probability.");
		}
		// question 11
		var selectedRadio = $('input[name=decision_11]:checked', '#decision_problems').val();
		console.log(selectedRadio);
		$("#answer11").text("In a situation where winning is possible but not probable, most people choose the prospect that offers the larger gain. 72% chose the first option. ");
		if (selectedRadio === '1') {
			$("#answer11").append("You agreed with the majority of respondents. ");
		} else if (selectedRadio === '2') {
			$("#answer11").append("You selected the minority choice.");
		}
		// question 12
		var selectedRadio = $('input[name=decision_12]:checked', '#decision_problems').val();
		console.log(selectedRadio);
		if (selectedRadio === '1') {
			$("#answer12").text("");
		} else if (selectedRadio === '2') {
			$("#answer12").text("");
		}
		// question 13
		var selectedRadio = $('input[name=decision_13]:checked', '#decision_problems').val();
		console.log(selectedRadio);
		if (selectedRadio === '1') {
			$("#answer13").text("");
		} else if (selectedRadio === '2') {
			$("#answer13").text("");
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
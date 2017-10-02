"use strict";
var prospect_theory = {
	hideAnswers: function() {
	    $(".answer").css("display:none;");
	},
	clearAnswers: function() {
	    //Clear previous answers
		$("#answer1").text("");
		$("#answer2").text("");
		$("#answer3").text("");
		$("#answer4").text("");
		$("#answer5").text("");
		$("#answer6").text("");
		$("#answer7").text("");
		$("#answer8").text(""); 	    
		$("#answer9").text(""); 	    
		$("#answer10").text(""); 	    
		$("#answer11").text("");
		$("#answer12").text("");
		$("#answer13").text("");
	},
	displayAnswers: function() {
		//document.getElementById('answer').style.display='block'; 
		
		// show answers
	    $(".answer").css("display:block;");
	    $(".answer").css("color", "blue");
	    $("#answers_above").text("See above for answers.");
	    this.clearAnswers();

		// question 1 
		$("#answer1").text("People underweight outcomes that are merely probable in comparison with outcomes that are obtained with certainty. Most people choose the certain (although smaller) gain. ");
		var selectedRadio = $('input[name=decision_1]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer1").append("You chose to maximize gains over certainty. Most people chose the opposite.");
		} else if (selectedRadio === '2') {
			$("#answer1").append("You chose certainty over maximiziing your gains. ");
		}
		// question 2
		$("#answer2").text("Decision makers tend to overweight small probabilities and underweight moderate and high probabilities. ");
		var selectedRadio = $('input[name=decision_2]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer2").append("You chose maximizing gains over certainty. Most people choose the opposite. ");
		} else if (selectedRadio === '2') {
			$("#answer2").append("You chose certainty over maximizing gains as most people do.");
		}
		// question 3
		$("#answer3").text("Decision makers tend to overweight small probabilities and underweight moderate and high probabilities. ");
		var selectedRadio = $('input[name=decision_3]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer3").append("You chose the higher probability gain with lower dollar value.");
		} else if (selectedRadio === '2') {
			$("#answer3").append("You chose to maximize gains over the higher probability gain.");
		}
		// question 4
		$("#answer4").text("Most people (82%) chose the certain gain even though the gamble has a higher mathematical value. ");
		var selectedRadio = $('input[name=decision_4]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer4").append("You chose the higher but less certain gain.");
		} else if (selectedRadio === '2') {
			$("#answer4").append("You chose the certain but smaller gain.");
		}
		// question 5
		$("#answer5").text("Most people (83%) chose the higher gain even though the second option has a higher probability. Note that this question is the same as the previous one except that a 66% chance to win $2400 has been removed from both options. Many people reverse their choice despite this equivalence. ");
		var selectedRadio = $('input[name=decision_5]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer5").append("You chose the higher gain.");
		} else if (selectedRadio === '2') {
			$("#answer5").append("You chose the higher probability.");
		}
		// question 6
		$("#answer6").text("Most people (80%) chose the certain gain even though the gamble has a higher mathematical value. ");
		var selectedRadio = $('input[name=decision_6]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer6").append("You chose to maximize total value over certainty. ");
		} else if (selectedRadio === '2') {
			$("#answer6").append("You chose certainty over total value. ");
		}
		// question 7
		$("#answer7").text("Most people (65%) chose the higher gain even though the second option has a higher probability. Note that this question is the same as the previous one except that the probabilities of both options have been divided by four. Many people reverse their choice despite this equivalence. ");
		var selectedRadio = $('input[name=decision_7]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer7").append("You chose to the lower probability with higher gain. ");
		} else if (selectedRadio === '2') {
			$("#answer7").append("You chose the higher probability with lower gain.");
		}
		// question 8
		$("#answer8").text("This question and the following one are used to determine if the certainty effect holds with non-monetary gains. Most people (78%) choose the certain option.");
		var selectedRadio = $('input[name=decision_8]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer8").append("You chose to gamble for a higher win. ");
		} else if (selectedRadio === '2') {
			$("#answer8").append("You chose the certain option. ");
		}
		// question 9
		$("#answer9").text("This question and the previous one are used to determine if the certainty effect holds with non-monetary gains. Most people (67%) choose the first option. In a situation where winning is possible but not probable, most people choose the prospect that offers the larger gain. Note that this question is the same as the previous one except that the probabilities of both options have been divided by ten. Many people reverse their choice despite this equivalence.");
		var selectedRadio = $('input[name=decision_9]:checked', '#decision_problems').val();
		if (selectedRadio === '1') {
			$("#answer9").append("You chose a lower probability for a larger gain.");
		} else if (selectedRadio === '2') {
			$("#answer9").append("You chose a higher probability for a smaller gain.");
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
	    $("#answer12").text("Most people (84%) chose the certain gain. ");
		var selectedRadio = $('input[name=decision_12]:checked', '#decision_problems').val();
		console.log(selectedRadio);
		if (selectedRadio === '1') {
			$("#answer12").append("You chose the uncertain but larger gain. ");
		} else if (selectedRadio === '2') {
			$("#answer12").append("You chose the certain but smaller gain.");
		}
		// question 13
	    $("#answer13").text("Most people (69%) chose the option that avoids a certain loss. Note that this question is the same as the previous one except that the choice is presented as a loss instead of a gain. Many people reverse their choice despite this equivalence. ");
		var selectedRadio = $('input[name=decision_13]:checked', '#decision_problems').val();
		console.log(selectedRadio);
		if (selectedRadio === '1') {
			$("#answer13").append("You chose to risk a larger loss to avoid a certain loss. ");
		} else if (selectedRadio === '2') {
			$("#answer13").append("You chose to accept what most people percieve as a certain loss.");
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
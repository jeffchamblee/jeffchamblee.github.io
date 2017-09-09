"use strict";

var confidence_test = {
	questionList: [],
	correctCount: 0,
	incorrectCount: 0,
	create: function() {
        var part1 = "<li class='question-item'>		<label class='desc' id='q1'>";
        var part2 = "</label>	<div>	<input type='text' class='input-box minimum'/> - 	<input type='text' class='input-box maximum' /> </div></li>";

        $.getJSON("questions.json", function(result){
        $.each(result, function(i, record) {
            $("#confidence_test").append(part1 + record.question + part2);
            confidence_test.questionList.push(record);
        });
    });
	},
	checkAnswers: function() {
		var form = document.getElementById('quiz1');
		var endLoop = (form.elements.length - 1) / 2;
		var index=0;
		for (; index < endLoop; index++) {
    		var minimum = form.elements[index * 2].value;
		    var maximum = form.elements[(index * 2) + 1].value;
			confidence_test.checkAnswer(minimum, maximum, index);
		}
		confidence_test.displayTotals();
	},
	checkAnswer: function(minimum, maximum, index) {
		var selectElement = "#confidence_test .question-item:nth-of-type(" + (index + 1) + ")";
		var result = false;
		var answer = confidence_test.questionList[index].answer;
		if ((minimum <= answer) && (maximum >= answer)) {
		    	result = true;
		}
		confidence_test.incrementCounts(result);
		var withinRange = confidence_test.getWithinRange(result);
		var answerString = "<div>Answer: " + answer + ". Your range: " + minimum + " - " + maximum + ". " + withinRange + ". </div>";
         $(selectElement).append(answerString);
         $(selectElement).css("height", "100px");
		return result;
	},
	getPercentCorrect: function() {
		return 100 * (confidence_test.correctCount / (confidence_test.correctCount + confidence_test.incorrectCount));
	},
	displayTotals: function() {
		var pctCorrect = confidence_test.getPercentCorrect();
		var answerString = "<div class='quiz_totals'> " + pctCorrect + "% of the intervals contained the correct answers.</div>";
         $(".info").append(answerString);		
	},
	incrementCounts: function(result) {
        if (result === true) { 
		    confidence_test.correctCount++;
		} else {
		    confidence_test.incorrectCount++;
		}
	},
	getWithinRange: function(result) {
		var withinRange;
		if (result === true) {
			withinRange = "<span class='within_range'>Within range</span>";
		} else {
			withinRange = "<span class='not_within_range'>NOT within range</span>";
		}
		return withinRange;
	}
};

$(document).ready(function() {
 	confidence_test.create();
});

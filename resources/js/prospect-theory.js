"use strict";

var prospect_theory = {
    question_list: [],
    hideAnswers: function() {
        $(".answer").css("display", "none");
        $(".answer_inline").css("display", "none");
    },
    displayQuestions: function(jsonFile) {
        $.getJSON(jsonFile, function(result){
            $.each(result, function(index, record) {
                $("#question-list").append(
                '<li id="decision_' + index + '"><label class="description">' + record.question + '</label> <span>' +
                prospect_theory.getChoices(record.choices, index) + '</span></li>' +
                '<p class="answer" id="answer' + index + '">' + record.answer + '</p>' +
                '<p class="answer" id="response' + index + '"></p>'
                );
                prospect_theory.question_list.push(record);
            });
            prospect_theory.hideAnswers();
        });
    },
    displayAnswers: function() {
        $(".answer").css("display", "block");
        $(".answer").css("color", "blue");
        $(".answer_inline").css("display", "inline");
        $(".answer_inline").css("color", "blue");
        $("#answers_above").text("See above for answers.");
        var index = 0;
        var selectedRadio;
        for (; index < prospect_theory.question_list.length; index++) {
            selectedRadio = $("input[name=decision_" + index + "]:checked", '#decision_problems').val();
            // TODO: allow more than two choices
            if (selectedRadio === '0') {
                $("#response" + index).text(prospect_theory.question_list[index].choices[0].response);
            } else if (selectedRadio === '1') {
                $("#response" + index).text(prospect_theory.question_list[index].choices[1].response);
            }
        }
        google_forms.postResponsesToGoogle();
    },
    getChoices: function(choiceList, index) {
        var choiceIndex = 0;
        var result = "";
        var expectedValue;
        for (; choiceIndex < choiceList.length; choiceIndex++) {
            result += '<label class="choice_prospect"> <input class="element radio_prospect" name="decision_' + index + '" type="radio" value="' + choiceIndex + '"/>' + choiceList[choiceIndex].text;
            expectedValue = choiceList[choiceIndex].expectedValue;
            if (typeof expectedValue !== 'undefined') {
                result += '<span class="answer_inline"> Expected value: ' + expectedValue + '</span>';
            }
        }
        return result + '</label>';
    }
};


var google_forms = {
	postResponsesToGoogle: function() {
		var email = $('#Email').val();
		var response1 = $("input[name='decision_0']:checked").val();
		var response2 = $("input[name='decision_1']:checked").val();
		var response3 = $("input[name='decision_2']:checked").val();
		var response4 = $("input[name='decision_3']:checked").val();
		var response5 = $("input[name='decision_4']:checked").val();
		var response6 = $("input[name='decision_5']:checked").val();
		var response7 = $("input[name='decision_6']:checked").val();
		var response8 = $("input[name='decision_7']:checked").val();
		var response9 = $("input[name='decision_8']:checked").val();
		var response10 = $("input[name='decision_9']:checked").val();
        console.log("response1=" + response1);
    
		$.ajax({
			url: "https://docs.google.com/forms/d/e/1FAIpQLSdyuFZN5AZYQfbElV_yXXixRUl2tzUfOFtIrxEx55HZ-Jiv2g/formResponse",
			data: {
				"entry.755042765": response1,
				"entry.1471559929": response2,
				"entry.1163044351": response3,
				"entry.1384086246": response4,
				"entry.879818529": response5,
				"entry.2112830407": response6,
				"entry.1699263877": response7,
				"entry.1101063328": response8,
				"entry.914134514": response9,
				"entry.2131069147": response10,
				"emailAddress": email
			},
			type: "POST",
			dataType: "xml",
			statusCode: {
				0: function() {
				    console.log("status 0");
					//window.location.replace("/quizzes/thank-you.html");
				},
				200: function() {
				    console.log("status 200");
					//window.location.replace("/quizzes/thank-you.html");
				}
			}
		});
	}
};
/*
<form action="https://docs.google.com/forms/d/e/1FAIpQLSdyuFZN5AZYQfbElV_yXXixRUl2tzUfOFtIrxEx55HZ-Jiv2g/formResponse" target="_self" method="POST" id="mG61Hd">
*/


"use strict";

var prospect_theory = {
    question_list: [],
    hideAnswers: function() {
        $(".answer").css("display", "none");
        $(".answer_inline").css("display", "none");
    },
    displayQuestions: function(jsonFile) {
        $.getJSON(jsonFile, function(result) {
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
        google_forms.postResponsesToGoogle();
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
		//var email = $('#Email').val();
		var email = "default@email.com";
		var response1 = $("input[name='decision_0']:checked").val();
		var responseText1 = prospect_theory.question_list[0].choices[response1].text;
        console.log("response1=" + responseText1);

		var response2 = $("input[name='decision_1']:checked").val();
		var responseText2 = prospect_theory.question_list[1].choices[response2].text;
		var response3 = $("input[name='decision_2']:checked").val();
		var responseText3 = prospect_theory.question_list[2].choices[response3].text;
		var response4 = $("input[name='decision_3']:checked").val();
		var responseText4 = prospect_theory.question_list[3].choices[response4].text;
		var response5 = $("input[name='decision_4']:checked").val();
		var responseText5 = prospect_theory.question_list[4].choices[response5].text;
		var response6 = $("input[name='decision_5']:checked").val();
		var responseText6 = prospect_theory.question_list[5].choices[response6].text;
		var response7 = $("input[name='decision_6']:checked").val();
		var responseText7 = prospect_theory.question_list[6].choices[response7].text;
		var response8 = $("input[name='decision_7']:checked").val();
		var responseText8 = prospect_theory.question_list[7].choices[response8].text;
		var response9 = $("input[name='decision_8']:checked").val();
		var responseText9 = prospect_theory.question_list[8].choices[response9].text;
		var response10 = $("input[name='decision_9']:checked").val();
		var responseText10 = prospect_theory.question_list[9].choices[response10].text;
    
		$.ajax({
			url: "https://docs.google.com/forms/d/e/1FAIpQLSdyuFZN5AZYQfbElV_yXXixRUl2tzUfOFtIrxEx55HZ-Jiv2g/formResponse",
			data: {
				"entry.755042765": responseText1,
				"entry.1471559929": responseText2,
				"entry.1163044351": responseText3,
				"entry.1384086246": responseText4,
				"entry.879818529": responseText5,
				"entry.2112830407": responseText6,
				"entry.1699263877": responseText7,
				"entry.1101063328": responseText8,
				"entry.914134514": responseText9,
				"entry.2131069147": responseText10,
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


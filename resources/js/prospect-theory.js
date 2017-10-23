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

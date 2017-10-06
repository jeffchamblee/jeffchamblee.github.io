"use strict";

var prospect_theory = {
    question_list: [],
    hideAnswers: function() {
        $(".answer").css("display", "none");
    },
    displayQuestions: function(jsonFile) {
        $.getJSON(jsonFile, function(result){
            $.each(result, function(index, record) {
                $("#question-list").append(
                '<li id="decision_' + index + '"><label class="description">' + record.question + '</label> <span>' +
                '<input class="element radio" id="decision_' + index + '_A" name="decision_' + index + '" type="radio" value="1"> <label class="choice" for="decision_' + index + '_A">' + record.choices[0].text + '</label> ' +
                '<input class="element radio" id="decision_' + index + '_B" name="decision_' + index + '" type="radio" value="2"> <label class="choice" for="decision_' + index + '_B">' + record.choices[1].text + '</label></span></li>' +
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
        $("#answers_above").text("See above for answers.");
        var index = 0;
        var selectedRadio;
        for (; index < prospect_theory.question_list.length; index++) {
            selectedRadio = $("input[name=decision_" + index + "]:checked", '#decision_problems').val();
            if (selectedRadio === '1') {
                $("#response" + index).text(prospect_theory.question_list[index].choices[0].response);
            } else if (selectedRadio === '2') {
                $("#response" + index).text(prospect_theory.question_list[index].choices[1].response);
            }
        }
    }
};

"use strict";

var prospect_theory = {
    create: function() {
        $('#decision_1 input:radio').click(function() {
    if ($(this).val() === 'max_utility') {
      $("#answer").text("Chose maximizing utility over certainty");
    } else if ($(this).val() === 'certainty') {
      $("#answer").text("Chose certainty over maximizing utility");
    } 
  });

    }
};

$(document).ready(function() {
    prospect_theory.create();
});

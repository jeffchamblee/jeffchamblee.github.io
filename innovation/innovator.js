"use strict";

var innovation = {
    calculate: function() {
        var score = 0;
        var ageIndex = 0;
        var birthOrderIndex = 0;
        var socialViewsIndex = 0;
        var baseRate = [
            //age: young
            [
                [14, 40, 49],
                //conservative
                [48, 77, 84],
                //moderate
                [75, 92, 96]
                //liberal
            ],
            //age: middle
            [
                [6, 22, 26],
                //conservative
                [25, 58, 66],
                //moderate
                [52, 82, 86]
                //liberal
            ],
            //age: old
            [
                [3, 12, 15],
                //conservative
                [15, 44, 50],
                //moderate
                [36, 72, 76],
                //liberal
            ]
        ];

        if (document.getElementById('age_1').checked) {
            ageIndex = 0;
        }
        if (document.getElementById('age_2').checked) {
            ageIndex = 1;
        }
        if (document.getElementById('age_3').checked) {
            ageIndex = 2;
        }

        if (document.getElementById('birth_order_1').checked) {
            birthOrderIndex = 0;
        }
        if (document.getElementById('birth_order_2').checked) {
            birthOrderIndex = 1;
        }
        if (document.getElementById('birth_order_3').checked) {
            birthOrderIndex = 2;
        }

        if (document.getElementById('social_views_1').checked) {
            socialViewsIndex = 0;
        }
        if (document.getElementById('social_views_2').checked) {
            socialViewsIndex = 1;
        }
        if (document.getElementById('social_views_3').checked) {
            socialViewsIndex = 2;
        }

        score = baseRate[ageIndex][socialViewsIndex][birthOrderIndex];
        console.log("Base rate: " + score);

        var scoreAdjustments = 0;
        //conflict with parent
        if (document.getElementById('other_1').checked) {
            if (document.getElementById('birth_order_1').checked) {
                scoreAdjustments += 30;
            } else {
                scoreAdjustments += 10;
            }
        }

        //shyness
        if (document.getElementById('other_2').checked) {
            if (document.getElementById('birth_order_1').checked) {
                scoreAdjustments += 20;
            } else {
                scoreAdjustments -= 15;
            }
        }

        //age spacing
        if (document.getElementById('age_spacing_1').checked || document.getElementById('age_spacing_3').checked) {
            if (document.getElementById('birth_order_1').checked) {
                scoreAdjustments += 5;
            } else {
                scoreAdjustments -= 5;
            }
        }

        //surrogate parenting
        if (document.getElementById('other_3').checked) {
            if (document.getElementById('birth_order_1').checked) {
                scoreAdjustments -= 15;
            } else {
                scoreAdjustments += 10;
            }
        }

        //sex
        if (document.getElementById('sex_2').checked) {
            if (document.getElementById('other_6').checked) {
                scoreAdjustments += 10;
            } else {
                scoreAdjustments += 5;
            }
        }

        //race
        if (document.getElementById('other_4').checked) {
            scoreAdjustments += 10;
        }

        //friendship
        if (document.getElementById('other_5').checked) {
            scoreAdjustments += 10;
        }
        console.log("Total adjustments: " + scoreAdjustments);
        var lineD = (50.0 - Math.abs(score - 50)) / 50.0;
        var lineE = scoreAdjustments * lineD;
        if (lineE > 0) {
            score += lineE;
        } else {
            score -= lineE;
        }

        //make sure scores don't go above 100
        score = Math.min(score, 100);

        //display final score
        document.getElementById('calculated_result').value = Math.round(score);
    }
}

//set event listener on all elements
document.addEventListener("DOMContentLoaded", function () {
	var elementList = document.getElementsByClassName("element");
	var index=0;
	for (;index < elementList.length; index++) {
		elementList[index].addEventListener("change", innovation.calculate);
	}
});

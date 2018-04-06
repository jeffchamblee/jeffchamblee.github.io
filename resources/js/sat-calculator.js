"use strict";

var satConvert = {
    getData: function () {
        var t = this;
        $.when($.getJSON("//jeffchamblee.github.io/resources/data/sat-scores.json", function (data) {
            t.scores = data;
        }), $.getJSON("//jeffchamblee.github.io/resources/data/sat-percentiles.json", function (data) {
            t.percentiles = data;
        }), $.getJSON("//jeffchamblee.github.io/resources/data/sat-composite-percentiles.json", function (data) {
            t.compositePercentiles = data;
        })).then(function () {
            /*
            console.log(satConvert.scores.length);
            console.log(satConvert.percentiles.length);
            console.log(satConvert.compositePercentiles.length);
            console.log(satConvert.findCompositePercentile(1400));
            */
            t.setupEventHandlers();
        });
    },
    setupEventHandlers: function () {
        console.log("setupEventHandlers");
        $(":range").rangeinput();
        $("#mathraw").change(function () {
          satConvert.updateDisplay();
        });
        $("#readingraw").change(function () {
          satConvert.updateDisplay();
        });
        $("#writingraw").change(function () {
          satConvert.updateDisplay();
        });
        $(":range").change(function () {
          satConvert.updateTableOfColleges();
        });
        console.log("setupEventHandlers end");
    },
    updateDisplay: function () {
        console.log("updateDisplay");
        var mathRaw = parseInt($("#mathraw").val());
        var n = parseInt($("#readingraw").val());
        var wr = parseInt($("#writingraw").val());
        if (isNaN(mathRaw)) {
            mathRaw = 0;
        }
        if (isNaN(n)) {
            n = 0;
        }
        if (isNaN(wr)) {
            wr = 0;
        }
        if (mathRaw <= 55 && mathRaw >= -6) {
            $("#mathscaled").val(satConvert.findScaledScore("math", mathRaw));
            $("#mathpercentile").val(satConvert.findPercentile("math", satConvert.findScaledScore("math", mathRaw)) + "%");
            satConvert.updateTotals(mathRaw, n, wr);
        } else {
            alert("Your math score should be between -6 and 54");
        }
        if (n <= 67 && n >= 0) {
            $("#readingscaled").val(satConvert.findScaledScore("reading", n));
            $("#readingpercentile").val(satConvert.findPercentile("reading",satConvert.findScaledScore("reading", n)) + "%");
            satConvert.updateTotals(mathRaw, n, wr);
        } else {
            alert("Your reading score should be between 0 and 67");
        }

        if (wr <= 49 && wr >= -6) {
            $("#writingscaled").val(satConvert.findScaledScore("writing", wr));
            $("#writingpercentile").val(satConvert.findPercentile("writing",satConvert.findScaledScore("writing", wr)) + "%");
            satConvert.updateTotals(mathRaw, n, wr);
        } else {
            alert("Your writing score should be between -6 and 67");
        }

    },
    updateTotals: function (e, n, wr) {
      $("#rawtotal").val(e + n + wr);
      var scaledTotal = parseFloat(satConvert.findScaledScore("math", e)) +
          parseFloat(satConvert.findScaledScore("reading", n)) +
          parseFloat(satConvert.findScaledScore("writing", wr));
      $("#scaledtotal").val(scaledTotal);
      $("#totalpercentile").val(satConvert.findCompositePercentile(scaledTotal) + "%");
    },
    findScaledScore: function (subject, rawScore) {
        var i;
        for (i = 0; i < satConvert.scores.length; i++) {
            if (satConvert.scores[i].subject === subject && satConvert.scores[i].raw_score === rawScore) {
                return satConvert.scores[i].scaled_score;
            }
        }
    },
    findPercentile: function (subject, scaledScore) {
        var i;
        for (i = 0; i < satConvert.percentiles.length; i++) {
            if (satConvert.percentiles[i].subject === subject && satConvert.percentiles[i].scaled_score === scaledScore) {
                return satConvert.percentiles[i].percentile;
            }
        }
    },
    findCompositePercentile: function (key) {
        var i;
        for (i = 0; i < satConvert.compositePercentiles.length; i++) {
            if (satConvert.compositePercentiles[i].composite_score === key) {
                return satConvert.compositePercentiles[i].percentile;
            }
        }
    },
    updateTableOfColleges: function () {
        var row = $("table#School tbody tr");
        var scaledReading = $("#readingscaled").val();
        var scaledMath = $("#mathscaled").val();
        row.removeClass();
        if (scaledReading || r) {
            row.each(function () {
                var averageReading = $(this).attr("data-reading");
                var averageMath = $(this).attr("data-math");
                var plusReading = parseFloat(averageReading) + 100;
                var plusMath = parseFloat(averageMath) + 100;
                if (averageReading < scaledReading && averageMath < scaledMath) {
                    $(this).addClass("average");
                }
                if (plusReading < scaledReading && plusMath < scaledMath) {
                    $(this).addClass("plus");
                }
            });
        }
    }
};

satConvert.getData();

"use strict";

var gauge = {
    draw: function (divId, stateRecord, stateName) {
        if (stateRecord) {
            //console.log("rate: " + stateRecord.rate + "\t25th: " + stateRecord.percentile_25th + "\tmedian: " + stateRecord.median + "\t75th: " + stateRecord.percentile_75th);
            //console.log(stateRecord);
            $(divId).dxLinearGauge($.extend(true, {}, this.options, {
                value: stateRecord.rate,
                valueIndicator: {
                    color: '#734F96',
                    type: 'textCloud',
                    arrowLength: 30,
                    text: {
                        precision: 1,
                        font: {
                            size: 12
                        },
                        customizeText: function () {
							if (stateRecord.rate === "NR" || stateRecord.rate === "#") {
								return stateName + " (Not Reported)";
							} else {
								return stateName + " (" + this.valueText + "%)";
							}
                        }
                    }
                },
                tooltip: {
                    enabled: true
                },
                subvalues: [stateRecord.percentile_25th, stateRecord.median, stateRecord.percentile_75th],
                subvalueIndicator: {
                    color: '#f05b41',
                    type: 'rhombus'
                    /*
                    type: 'textCloud',
                    arrowLength: 20,
                    text: {
                        precision: 1,
                        customizeText: function (arg) {
                            return getLabel(arg.valueText) + "\n" + arg.valueText;
                        }
                    }
                    */
                }
            }));
        }
    },
    options: {
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 10
            //customTicks: [stateRecord.percentile_25th, stateRecord.median, stateRecord.percentile_75th]
        }
    }
};

var labels = ["25th", "50th", "75th"];

function getLabel(valueStr) {
    var labelStr = "";
    switch (valueStr) {
    case "46.2":
        labelStr = labels[0];
        break;
    case "52.5":
        labelStr = labels[1];
        break;
    case "59.2":
        labelStr = labels[2];
        break;
    default:
        labelStr = "foo";
    }
    return labelStr;
}

/*
$("#gauge2").dxLinearGauge($.extend(true, {}, options, {
    value: stateRecord.rate,
    valueIndicator: {
        color: '#734F96',
        type: 'triangle'
    },
    subvalues: [stateRecord.percentile_25th, stateRecord.median, stateRecord.percentile_75th],
    subvalueIndicator: {
        color: '#f05b41',
        type: 'textCloud',
        arrowLength: 20,
        text: {
            precision: 1,
            customizeText: function (arg) {
               return getLabel(arg.valueText);
            }
        }
    }
}));
*/


"use strict";

function readDataFile(filename) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filename, false);
    xmlHttp.send();
    return $.parseJSON(xmlHttp.responseText);
}

var enrollmentGrowth = {
    jsonData: readDataFile("/resources/data/enrollment-growth.json"),
    getData: function () {
        var data = new google.visualization.DataTable();
        var record = [];
        var index = 0;

        data.addColumn('string', 'Month');
        data.addColumn('number', 'States with Expansion in Effect');
        data.addColumn('number', 'All States Reporting');
        data.addColumn('number', 'Non-Expansion States');

        //get last 7 months of data
        var count = enrollmentGrowth.jsonData.length;
        if (count < 7) {
            throw "Need at least 7 rows of enrollment data";
        }
        var begin = count - 7;
        //charts need data in backwards order
        for (index = count - 1; index >= begin; index--) {
            record = enrollmentGrowth.jsonData[index];
            data.addRow([record.year_month_label, Number(record.enrollment_percent_expansion), Number(record.enrollment_percent_total), Number(record.enrollment_percent_non_expansion)]);
        }
        return data;
    },
    display: function () {
        var options = {
            //title: 'Medicaid and CHIP Enrollment Growth',
            //subtitle: '(Preliminary Data)',
            chartArea: {left: "40", top: "40", right: 270},
            //legend: 'labeled',
            colors: ['#066792','#026666', '#d17d28'],
            vAxis: {format: 'percent', ticks: [0.0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40]},
            hAxis: {
                direction: -1,
                slantedText: true,
                slantedTextAngle: 30
            },
            width: enrollmentGrowth.width,
            height: enrollmentGrowth.height
        };
        var chart = new google.visualization.LineChart(document.getElementById('enrollment_growth'));
        var data = enrollmentGrowth.getData();
        if (data) {
            chart.draw(data, options);
        }
    },
	width: 700,
	height: 400
};

google.charts.setOnLoadCallback(enrollmentGrowth.display);


// allow users to change size by clicking on chart or size text
$(document).ready(function(){
	$("#enrollment_growth").click(function() {
		enrollmentGrowth.width = 800;
		enrollmentGrowth.height = 500;
		enrollmentGrowth.display();
	});

	$("#smaller").click(function() {
		enrollmentGrowth.width = 500;
		enrollmentGrowth.height = 250;
		enrollmentGrowth.display();		
	});
	$("#medium").click(function() {
		enrollmentGrowth.width = 700;
		enrollmentGrowth.height = 400;
		enrollmentGrowth.display();		
	});
	$("#bigger").click(function() {
		enrollmentGrowth.width = 800;
		enrollmentGrowth.height = 500;
		enrollmentGrowth.display();		
	});
});

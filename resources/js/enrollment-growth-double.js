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
    getStatesReporting: function () {
        var data = new google.visualization.DataTable();
        var record = [];
        var index = 0;

        data.addColumn('string', 'Month');
        data.addColumn('number', 'Number of States Reporting');

        //get last 7 months of data
        var count = enrollmentGrowth.jsonData.length;
        if (count < 7) {
            throw "Need at least 7 rows of enrollment data";
        }
        var begin = count - 7;
        //charts need data in backwards order
        for (index = count - 1; index >= begin; index--) {
            record = enrollmentGrowth.jsonData[index];
            data.addRow([record.year_month_label, Number(record.states_reporting)]);
        }
        return data;
    },
    display: function () {
        var options = {
            //title: 'Medicaid and CHIP Enrollment Growth',
            chartArea: {left: 40, top: 40, right: 240, bottom: 80},
            //legend: {position: 'top'},
            colors: ['#066792', '#d17d28', '#026666', '#555555'],
            hAxis: {
                direction: -1,
                slantedText: true,
                slantedTextAngle: 30
            },
            vAxis: {format: 'percent', ticks: [0.0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40]},
            width: 700,
            height: 350
        };
        var chart = new google.visualization.LineChart(document.getElementById('enrollment_growth'));
        var data = enrollmentGrowth.getData();
        if (data) {
            chart.draw(data, options);
        }
    },
    displayStatesReporting: function () {
        var options = {
            chartArea: {left: 40, top: 20, right: 240},
            //legend: {position: 'top'},
            colors: ['#d17d28', '#026666', '#066792', '#555555'],
            //hAxis: {textPosition: 'none'},
            hAxis: {
                direction: -1,
                slantedText: true,
                slantedTextAngle: 30
            },
            vAxis: {viewWindowMode: 'explicit', viewWindow: {max: 50, min: 46}, format: '#'},
            width: 700,
            height: 250
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('enrollment_growth_states_reporting'));
        var data = enrollmentGrowth.getStatesReporting();
        if (data) {
            chart.draw(data, options);
        }
    }
};

google.charts.setOnLoadCallback(enrollmentGrowth.display);
google.charts.setOnLoadCallback(enrollmentGrowth.displayStatesReporting);
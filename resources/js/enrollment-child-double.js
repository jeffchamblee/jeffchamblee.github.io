"use strict";

function readDataFile(filename) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filename, false);
    xmlHttp.send();
    return $.parseJSON(xmlHttp.responseText);
}

var enrollmentChild = {
    jsonData: readDataFile("/resources/data/enrollment-growth.json"),
    getData: function () {
        var data = new google.visualization.DataTable();
        var record = [];
        var index = 0;
        var numberOfMonths = 6;

        data.addColumn('string', 'Month');
        data.addColumn('number', 'Total Medicaid Child & CHIP Enrollment');

        //get last numberOfMonths of data
        var count = enrollmentChild.jsonData.length;
        if (count < numberOfMonths) {
            throw "Need at least 12 rows of enrollment data";
        }
        var begin = count - numberOfMonths;
        //charts need data in backwards order
        for (index = count - 1; index >= begin; index--) {
            record = enrollmentChild.jsonData[index];
            data.addRow([record.year_month_label, parseInt(record.enrollment_child)]);
        }
        return data;
    },
    getStatesReporting: function () {
        var data = new google.visualization.DataTable();
        var record = [];
        var index = 0;
        var numberOfMonths = 6;

        data.addColumn('string', 'Month');
        data.addColumn('number', 'Number of States Reporting');

        //get last numberOfMonths of data
        var count = enrollmentChild.jsonData.length;
        if (count < numberOfMonths) {
            throw "Need at least 12 rows of enrollment data";
        }
        var begin = count - numberOfMonths;
        //charts need data in backwards order
        for (index = count - 1; index >= begin; index--) {
            record = enrollmentChild.jsonData[index];
            data.addRow([record.year_month_label, parseInt(record.states_reporting_child)]);
        }
        return data;
    },
    display: function () {
        var options = {
            chartArea: {left: 100, top: 40, right: 240, bottom: 80},
            //legend: 'bottom',
            colors: ['#066792', '#026666', '#d17d28'],
            //vAxis: {minValue: 0},
            hAxis: {
                direction: -1,
                slantedText: true,
                slantedTextAngle: 30
            },
            width: 700,
            height: 350
        };
        var chart = new google.visualization.LineChart(document.getElementById('enrollment_child'));
        var data = enrollmentChild.getData();
        chart.draw(data, options);
    },
    displayStatesReporting: function () {
        var options = {
            chartArea: {left: 100, top: 20, right: 240, bottom: 100},
            //legend: 'bottom',
            colors: ['#d17d28', '#026666', '#066792'],
            //vAxis: {minValue: 0},
            hAxis: {
                direction: -1,
                slantedText: true,
                slantedTextAngle: 30
            },
            vAxis: {viewWindowMode: 'explicit', viewWindow: {max: 48, min: 44}, format: '#'},
            width: 700,
            height: 250
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('enrollment_child_states_reporting'));
        var data = enrollmentChild.getStatesReporting();
        chart.draw(data, options);
    }
};

google.charts.setOnLoadCallback(enrollmentChild.display);
google.charts.setOnLoadCallback(enrollmentChild.displayStatesReporting);
"use strict";

var enrollmentGrowth = {
    getData: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "/resources/data/enrollment-monthly-national.json",
            success: function (jsonData) {
                enrollmentGrowth.display(enrollmentGrowth.createDataTable(jsonData));
            },
            error: function () {
                alert('Error in enrollmentGrowth.getData(). Unable to get data from ' + this.url);
            }
        });
    },
    createDataTable: function (jsonData) {
        var dataTable = new google.visualization.DataTable();
        var record = [];
        var index = 0;
        dataTable.addColumn('string', 'Month');
        dataTable.addColumn('number', 'Medicaid Enrollment');
        for (; index < jsonData.length; index++) {
            record = jsonData[index];
            dataTable.addRow([record.month.substring(0, 7), Number(record.enrollment)]);
        }
        return dataTable;
    },
    display: function (dataTable) {
        var chart = new google.visualization.LineChart(document.getElementById('enrollment_growth'));
        var columns = [0, 1];
        var options = {
            hAxis: {
                slantedText: true,
                slantedTextAngle: 40
            },
            chartArea: {left: 80, top: 40, right: 120, bottom: 100},
            colors: ['#026666', '#d17d28', '#066792', '#555555'],
            pointSize: 4,
            pointShape: 'circle',
            width: 700,
            height: 400
        };
        var view = new google.visualization.DataView(dataTable);
        //console.log(JSON.stringify(columns));
        view.setColumns(columns);
        chart.draw(view, options);
    }
};
google.load('visualization', 'current', {packages: ['corechart']});
enrollmentGrowth.getData();

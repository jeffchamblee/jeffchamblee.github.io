"use strict";

var enrollmentChild = {
    getData: function () {
        var parent = this;
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "/resources/data/enrollment-growth.json",
            success: function (jsonData) {
                parent.display(parent.prepareDataTable(jsonData));
            },
            error: function (obj) {
                console.log('Error in qualityMeasuresNational.getData(). Unable to get data from ' + this.url);
            }
        });
    },
    prepareDataTable: function (jsonData) {
        var data = new google.visualization.DataTable();
        var record = [];
        var index = 0;
        var numberOfMonths = 6;

        data.addColumn('string', 'Month');
        data.addColumn('number', 'Total Medicaid Child & CHIP Enrollment');
        //data.addColumn({type: 'string', role: 'annotation'});

        //get last numberOfMonths of data
        var count = jsonData.length;
        if (count < numberOfMonths) {
            throw "Need at least 6 rows of enrollment data";
        }
        var begin = count - numberOfMonths;
        for (index = begin; index < count; index++) {
            record = jsonData[index];
            //data.addRow([record.year_month_label, parseInt(record.enrollment_child), parseInt(record.states_reporting_child) + ' states']);
            data.addRow([record.year_month_label + '\n' + record.states_reporting_child + ' states', parseInt(record.enrollment_child)]);
        }
        return data;
    },
    display: function (dataTable) {
        var options = {
            chartArea: {left: 80, top: 40, right: 20, bottom: 180},
            legend: 'bottom',
            colors: ['#066792', '#026666', '#d17d28'],
            annotations: {textStyle: {color: 'black'}, datum: {stem: {length: 10, color: 'none'}}, alwaysOutside: true},
            vAxis: {minValue: 0},
            /*
            hAxis: {
                slantedText: true,
                slantedTextAngle: 45
            },
            */
            width: 600,
            height: 400
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('enrollment_child'));
        /*
        var view = new google.visualization.DataView(dataTable);
        view.setColumns([0, 1, 
            {
            calc: "stringify",
            sourceColumn: 2,
            align: "bottom",
            type: "string",
            role: "annotation"
            }
        ]);
        */
        chart.draw(dataTable, options);
    }
};

enrollmentChild.getData();
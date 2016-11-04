"use strict";

var enrollmentChild = {
    getData: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "/resources/data/enrollment-child.json",
            success: function (jsonData) {
                if (jsonData.length < 3) {
                    throw "Need at least 3 rows of enrollment data";
                }
                //console.log(JSON.stringify(jsonData));
                enrollmentChild.showTotal = jsonData.slice(0, 1);
                //console.log(JSON.stringify(enrollmentChild.showTotal));

                enrollmentChild.display(enrollmentChild.createDataTable(enrollmentChild.showTotal));
            },
            error: function () {
                alert('Error in enrollmentChild.getData(). Unable to get data from ' + this.url);
            }
        });
    },
    createDataTable: function (jsonData) {
        var dataTable = new google.visualization.DataTable();
        var record = [];
        var index = 0;

        dataTable.addColumn('string', 'Description');
        dataTable.addColumn({type: 'string', role: 'annotation'});
        dataTable.addColumn('number', 'Child & CHIP Enrollment');
        dataTable.addColumn('number', 'Adult Enrollment');
        dataTable.addColumn('number', 'Total');
        dataTable.addColumn({type: 'number', role: 'annotation'});

        var count = jsonData.length;
        for (index = 0; index < count; index++) {
            record = jsonData[index];
            dataTable.addRow([record.description, '(' + parseInt(record.states_reporting) + ' states)', Number(record.child_enrollment), Number(record.adult_enrollment), 0, Number(record.total_enrollment)]);
        }
        return dataTable;
    },
    display: function (dataTable) {
        var chart = new google.visualization.ComboChart(document.getElementById('enrollment_child'));
        var options = {
            isStacked: true,
            seriesType: 'bars',
            chartArea: {left: 80, top: 40, right: 200, bottom: 60},
            colors: ['#17415F', '#ca4d22', '#026666', '#d17d28', '#066792', '#555555'],
            annotations: {textStyle: {color: 'black'}, domain: {stem: {length: -40, color: 'none'}}, datum: {stem: {length: 5, color: 'none'}}},
            series: {2: {visibleInLegend: false}},
            width: 700,
            height: 400
        };
        //google.visualization.events.addListener(chart, 'select', showHideSeries);
        var view = new google.visualization.DataView(dataTable);
        var columns = [0, 1, 2,
            {
            calc: "stringify",
            sourceColumn: 2,
            type: "string",
            role: "annotation"
            },
            3,
            {
            calc: "stringify",
            sourceColumn: 3,
            type: "string",
            role: "annotation"
            },4,5
        ];
        //console.log(JSON.stringify(columns));
        view.setColumns(columns);
        chart.draw(view, options);
        initCheckboxHandlers();
    }
};

google.load('visualization', 'current', {packages: ['corechart']});
enrollmentChild.getData();

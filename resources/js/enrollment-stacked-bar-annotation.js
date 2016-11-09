"use strict";

var enrollmentStackedBar = {
    getData: function () {
        var parent = this;
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "/resources/data/enrollment-stacked-bar.json",
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

        data.addColumn('string', 'Month');
        data.addColumn('number', 'Expansion States');
        data.addColumn('number', 'Non-Expansion States');
        data.addColumn('number', 'Total');
        data.addColumn({type:'number', role:'annotation'});
        //data.addColumn({type:'string', role:'annotation'});
        //data.addColumn({type:'string', role:'annotation'});

        var count = jsonData.length;
        if (count < 3) {
            throw "Need at least 3 rows of enrollment data";
        }
        for (index = 0; index < count; index++) {
			if (index == 0 || index == 2) {
                record = jsonData[index];
                //data.addRow([record.long_label, record.enrollment_expansion, record.enrollment_non_expansion, 0, record.enrollment_total, "", record.states_reporting + ' states']);
                data.addRow([record.long_label + ' \n(' + record.states_reporting + ' states)', record.enrollment_expansion, record.enrollment_non_expansion, 0, record.enrollment_total]);
			}
        }
        return data;
    },
    display: function (data) {
        var options = {
            isStacked: true,
            //title : 'Total Monthly Medicaid and CHIP Enrollment',
            //legend: 'top',
            chartArea: {left: 100, top: 20, right: 200, bottom: 140},
            colors: ['#17415F', '#026666', 'black'],
            seriesType: 'bars',
            vAxis: {maxValue: 75000000},
            series: {2: {visibleInLegend: false}},
            backgroundColor: 'transparent',
            annotations: {datum: {stem: { length: 12, color: 'none'}}},
            width: 700,
            height: 400
        };

       var chart = new google.visualization.ComboChart(document.getElementById('enrollment_stacked_bar'));
       if (data) {
            // view is needed to display values within bars
            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
                },
                2,
                {
                calc: "stringify",
                sourceColumn: 2,
                type: "string",
                role: "annotation"
                },
                3, 4
            ]);
            chart.draw(view, options);
       }
    }
};

enrollmentStackedBar.getData();
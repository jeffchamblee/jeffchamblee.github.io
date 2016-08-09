"use strict";

var enrollmentGrowth = {
    getData: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "/resources/data/enrollment-growth.json",
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
        var numberOfMonths = 6;

        dataTable.addColumn('string', 'Month');
        //dataTable.addColumn({type: 'string', role: 'annotation'});
        dataTable.addColumn('number', 'All States Reporting');
        dataTable.addColumn('number', 'States with Expansion in Effect');
        dataTable.addColumn('number', 'Non-Expansion States');

        //get last 6 months of data
        var count = jsonData.length;
        if (count < numberOfMonths) {
            throw "Need at least 6 rows of enrollment data";
        }
        for (index = count - numberOfMonths; index < count; index++) {
            record = jsonData[index];
            dataTable.addRow([record.year_month_label + "\n" + record.states_reporting + ' states', Number(record.enrollment_percent_total), Number(record.enrollment_percent_expansion), Number(record.enrollment_percent_non_expansion)]);
        }
        return dataTable;
    },
    display: function (dataTable) {
        var chart = new google.visualization.ColumnChart(document.getElementById('enrollment_growth'));
        var columns = [];
        var series = [];
        var defaultSeries = [1];
        var index;
        var nonShowHideColumns = 1; //year_month_label
        for (index = 0; index < dataTable.getNumberOfColumns(); index++) {
            if (index < nonShowHideColumns || defaultSeries.indexOf(index) > -1) {
                // if the column is the domain column or in the default list, display the series
                columns.push(index);
            } else {
                // otherwise, hide it
                columns.push({
                    label: dataTable.getColumnLabel(index),
                    type: dataTable.getColumnType(index),
                    sourceColumn: index,
                    calc: function () {
                        return null;
                    }
                });
            }
            if (index > 1) {
                // set the default series option
                series[index - nonShowHideColumns] = {};
                if (defaultSeries.indexOf(index) === -1) {
                    // backup the default color (if set)
                    if ((series[index - nonShowHideColumns].color) !== 'undefined') {
                        series[index - nonShowHideColumns].backupColor = series[index - nonShowHideColumns].color;
                    }
                    series[index - nonShowHideColumns].color = '#CCCCCC';
                }
            }
        }
        // format tooltips as percent, not decimals
        var formatter = new google.visualization.NumberFormat({
            pattern: '#,###.0%'
        });
        formatter.format(dataTable, 1);
        formatter.format(dataTable, 2);
        formatter.format(dataTable, 3);
        var options = {
            /*
            hAxis: {
                slantedText: true,
                slantedTextAngle: 70
            },
            */
            vAxis: {format: 'percent', ticks: [0.0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40]},
            chartArea: {left: 40, top: 40, right: 180, bottom: 60},
            colors: ['#d17d28', '#026666', '#066792', '#555555'],
            annotations: {textStyle: {color: 'black'}, domain: {stem: {length: -95, color: 'none'}}},
            width: 700,
            height: 400,
            series: series
        };
        function showHideSeries() {
            var src;
            var selection = chart.getSelection();
            // if selection length is 0, we deselected an element
            if (selection.length > 0) {
                // if row is undefined, we clicked on the legend
                if (selection[0].row === null) {
                    var col = selection[0].column;
                    if (typeof(columns[col]) === 'number') {
                        src = columns[col];

                        // hide the data series
                        /*
                        columns[col] = {
                            label: dataTable.getColumnLabel(src),
                            type: dataTable.getColumnType(src),
                            sourceColumn: src,
                            calc: function () {
                                return null;
                            }
                        };
                        // grey out the legend entry
                        series[src - nonShowHideColumns].color = '#CCCCCC';
                        */
                    } else {
                        /*
                        src = columns[col].sourceColumn;

                        // show the data series
                        columns[col] = src;
                        series[src - nonShowHideColumns].color = null;
                        */
                    }
                    var view = new google.visualization.DataView(dataTable);
                    //console.log(JSON.stringify(columns));
                    view.setColumns(columns);
                    chart.draw(view, options);
                }
            }
        }
        google.visualization.events.addListener(chart, 'select', showHideSeries);
        var view = new google.visualization.DataView(dataTable);
        //console.log(JSON.stringify(columns));
        view.setColumns(columns);
        chart.draw(view, options);
        initCheckboxHandlers(chart, dataTable, options, columns, series, nonShowHideColumns);
    }
};

function initCheckboxHandlers(chart, dataTable, options, columns, series, nonShowHideColumns) {
    var showExpansionCheck = document.getElementById("showExpansionCheck");
    //showExpansionCheck.style.fontFamily = "Arial,sans-serif";
    //showExpansionCheck.style.fontSize = "xx-large";
    //showExpansionCheck.style.color = "red";
    showExpansionCheck.onclick = function () {
        var src = 2;
        var col = 2;
        if (showExpansionCheck.checked) {
            // show the data series
            columns[col] = src;
            series[src - nonShowHideColumns].color = null;
        } else {
            // hide the data series
            columns[col] = {
                label: dataTable.getColumnLabel(src),
                type: dataTable.getColumnType(src),
                sourceColumn: src,
                calc: function () {
                    return null;
                }
            };
            // grey out the legend entry
            series[src - nonShowHideColumns].color = '#CCCCCC';
        }
        draw();
    };
    var showNonExpansionCheck = document.getElementById("showNonExpansionCheck");
    showNonExpansionCheck.onclick = function () {
        var src = 3;
        var col = 3;
        if (showNonExpansionCheck.checked) {
            // show the data series
            columns[col] = src;
            series[src - nonShowHideColumns].color = null;
        } else {
            // hide the data series
            columns[col] = {
                label: dataTable.getColumnLabel(src),
                type: dataTable.getColumnType(src),
                sourceColumn: src,
                calc: function () {
                    return null;
                }
            };
            // grey out the legend entry
            series[src - nonShowHideColumns].color = '#CCCCCC';
        }
        draw();
    };
    function draw() {
        var view = new google.visualization.DataView(dataTable);
        view.setColumns(columns);
        chart.draw(view, options);
    }
}

google.load('visualization', 'current', {packages: ['corechart']});
enrollmentGrowth.getData();

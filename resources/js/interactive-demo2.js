function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    // create columns array
    var columns = [];
    // display these data series by default
    var defaultSeries = [1, 2];
    var series = {};
    for (var i = 0; i < data.getNumberOfColumns(); i++) {
        if (i == 0 || defaultSeries.indexOf(i) > -1) {
            // if the column is the domain column or in the default list, display the series
            columns.push(i);
        }
        else {
            // otherwise, hide it
            columns.push({
                label: data.getColumnLabel(i),
                type: data.getColumnType(i),
                sourceColumn: i,
                calc: function () {
                    return null;
                }
            });
        }
        if (i > 0) {
			/*
            columns.push({
                calc: 'stringify',
                sourceColumn: i,
                type: 'string',
                role: 'annotation'
            });
			*/
            // set the default series option
            series[i - 1] = {};
            if (defaultSeries.indexOf(i) == -1) {
                // backup the default color (if set)
                if (typeof(series[i - 1].color) !== 'undefined') {
                    series[i - 1].backupColor = series[i - 1].color;
                }
                series[i - 1].color = '#CCCCCC';
            }
        }
    }

    var options = {
        width: 900,
        height: 500,
        series: series
    }

    function showHideSeries () {
        var selection = chart.getSelection();
        // if selection length is 0, we deselected an element
        if (selection.length > 0) {
            // if row is undefined, we clicked on the legend
            if (selection[0].row == null) {
                var col = selection[0].column;
                if (typeof(columns[col]) == 'number') {
                    var src = columns[col];

                    // hide the data series
                    columns[col] = {
                        label: data.getColumnLabel(src),
                        type: data.getColumnType(src),
                        sourceColumn: src,
                        calc: function () {
                            return null;
                        }
                    };

                    // grey out the legend entry
                    series[src - 1].color = '#CCCCCC';
                }
                else {
                    var src = columns[col].sourceColumn;

                    // show the data series
                    columns[col] = src;
                    series[src - 1].color = null;
                }
                var view = new google.visualization.DataView(data);
                view.setColumns(columns);
                chart.draw(view, options);
            }
        }
    }

    google.visualization.events.addListener(chart, 'select', showHideSeries);

    // create a view with the default columns
    var view = new google.visualization.DataView(data);
    view.setColumns(columns);
    chart.draw(view, options);
}

google.load('visualization', '1', {packages: ['corechart']});
google.setOnLoadCallback(drawChart);
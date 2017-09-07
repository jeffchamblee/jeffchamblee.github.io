"use strict";

var barChart = {
    draw: function () {
        var data = google.visualization.arrayToDataTable([
            ['Group', 'Reported', 'Unreported', {role: 'style'}],
            ['Child', 14, 6, 'stroke-color: #333333; stroke-width: 0.5; fill-color: #EEEEEE'],
            ['Adult', 11, 1, 'stroke-color: #333333; stroke-width: 0.5; fill-color: #EEEEEE']
        ]);
        var options = {
            width: 900,
            height: 200,
            legend: {position: 'top'},
            //chartArea: {width: '70%'},
            colors: ["#066792", "#EEEEEE"],
            isStacked: true
        };

        // Instantiate and draw the chart.
        var chart = new google.visualization.BarChart(document.getElementById('quality_chart'));
        chart.draw(data, options);
        $("#quality_source").html("Source: <a href='https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/index.html'>Medicaid Quality of Care Performance Measurement</a>");
    }
};

google.charts.setOnLoadCallback(barChart.draw);

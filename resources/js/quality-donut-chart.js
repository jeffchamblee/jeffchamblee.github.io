"use strict";

var donutChart = {
    drawAll: function () {
        var child = google.visualization.arrayToDataTable([
            ['Group', 'Count'],
            ['Reported',  14],
            ['Unreported', 6]
        ]);
        var adult = google.visualization.arrayToDataTable([
            ['Group', 'Count'],
            ['Reported',  11],
            ['Unreported', 1]
        ]);
        donutChart.draw("Child Quality Measures", child, 'quality_chart_child');
        donutChart.draw("Adult Quality Measures", adult, 'quality_chart_adult');
        donutChart.styleLegend();
        donutChart.setSource();
    },
    draw: function (titleString, data, elementId) {
        var options = {
            title: titleString,
            width: 400,
            height: 300,
            legend: {position: 'right'},
            colors: ["#066792", "#BBBBBB"],
            pieHole: 0.4,
        };

        // Instantiate and draw the chart.
        var chart = new google.visualization.PieChart(document.getElementById(elementId));
        chart.draw(data, options);
    },
    styleLegend: function () {
        //style the box in the second data element in the legend
        var legend = document.querySelector('#quality_chart_child > div > div:nth-child(1) > div > svg > g:nth-child(3) > g:nth-child(3) > rect:nth-child(3)');
        if (legend) {
            legend.setAttribute('style', "fill:#EEEEEE;stroke:#333333;stroke-width:0.5;fill-opacity:1.0;stroke-opacity:1.0");
        }
    },
    setSource: function () {
        $("#quality_source").html("Source: <a href='https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/index.html'>Medicaid Quality of Care Performance Measurement</a>");
    }
};

google.charts.setOnLoadCallback(donutChart.drawAll);

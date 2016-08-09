"use strict";

google.load("visualization", "1", {packages: ["corechart"]});

google.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2004', 200, 400],
        ['2005', 400, 460],
        ['2006', 960, 1120],
        ['2007', 2030, 1540]
    ]);
    var options = {
        title: 'Company Performance'
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);

    var hiddenColumns = [];
    var showExpensesCheck = document.getElementById("showExpensesCheck");
    showExpensesCheck.onclick = function () {
        if (showExpensesCheck.checked) {
            hiddenColumns.pop();
        } else {
            hiddenColumns.push(2);
        }
        draw();
    };

    var showSalesCheck = document.getElementById("showSalesCheck");
    showSalesCheck.onclick = function () {
        if (showSalesCheck.checked) {
            hiddenColumns.pop();
        } else {
            hiddenColumns.push(1);
        }
        draw();
    };
    function draw() {
        if (hiddenColumns.length >= 2) {
            console.log("nothing to draw");
        } else {
            var view = new google.visualization.DataView(data);
            view.hideColumns(hiddenColumns);
            chart.draw(view, options);
        }
    }
}

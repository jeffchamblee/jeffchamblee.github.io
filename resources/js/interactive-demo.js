google.load("visualization", "1", {packages:["corechart"]});
//google.charts.load('current', {'packages': ['corechart']});

google.setOnLoadCallback(drawChart);
  
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);
    var options = {
      title: 'Company Performance'
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);


   var showBoth = document.getElementById("showBoth");
   showBoth.onclick = function()
   {
      chart.draw(data, options);
   }
   var showSales = document.getElementById("showSales");
   showSales.onclick = function()
   {
      view = new google.visualization.DataView(data);
      view.hideColumns([2]); 
      chart.draw(view, options);
   }
   var showExpenses = document.getElementById("showExpenses");
   showExpenses.onclick = function()
   {
      view = new google.visualization.DataView(data);
      view.hideColumns([1]); 
      chart.draw(view, options);
   }


  }

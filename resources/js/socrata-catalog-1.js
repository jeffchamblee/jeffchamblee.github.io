"use strict";

//used by socrata-catalog-1.html
var socrata_catalog = {
    // format date as YYYY-MM-DD
    formatDate: function (date) {
        return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    },
    getMetadata: function () {
        var element = document.getElementById("domain-selector");
        var domain = element.options[element.selectedIndex].value;
        var webservice = "http://api.us.socrata.com/api/catalog/v1?&only=datasets&limit=10000&order=name&domains=" + domain;
        //clear rows of previous query from table
        $("#dataset-table > tbody").html("");
        $.getJSON(webservice, function (data) {
            //console.log(data);
            document.getElementById("domain-name").innerHTML = domain;
            document.getElementById("domain-json-url").innerHTML = webservice;
            document.getElementById("dataset-count").innerHTML = data.results.length;
            $.each(data.results, function (index) {
                $("#dataset-table > tbody").append("<tr><td>" + data.results[index].resource.name +
                    "</td><td>" + data.results[index].resource.download_count +
                    "</td><td>" + socrata_catalog.formatDate(new Date(data.results[index].resource.updatedAt)) +
                    "</td><td>" + data.results[index].owner.display_name +
                    "</td></tr>");
            });
        });
    }
};

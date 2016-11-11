var socrataDomainFinder = {
    showDataTable: function () {
        $('#catalog_table').dataTable( {
        "ajax": {
            "processing" : true,
            "url": "http://api.us.socrata.com/api/catalog/v1/domains",
            "dataSrc" : "results"
        },
        "columns": [
            { "data" : "domain",
                    "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<a href='//" + oData.domain + "'>" + oData.domain + "</a>");
                }
            },
            { "data" : "count" },
        ]       
    } );

    }
}

socrataDomainFinder.showDataTable();


$(document).ready(function() {
} );


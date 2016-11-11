"use strict";

var columnSearch = {
    makeColumnsSearchable: function () {
        // Setup - add a text input to each footer cell
        $('#catalog_table tfoot th').each(function () {
            var title = $('#catalog_table thead th').eq($(this).index()).text();
            $(this).html('<input type="text" class="colSearch" placeholder="Search ' + title + '" />');
        });

        // Apply the search
        var dataTable = $('#catalog_table').DataTable();
        dataTable.columns().every(function () {
            var that = this;
            $('.colSearch', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });

        //move footers to the top
        var row = $('#catalog_table tfoot tr');
        row.find('th').each(function () {
            $(this).css('padding', 8);
        });
        $('#catalog_table thead').append(row);
    }
};

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
    columnSearch.makeColumnsSearchable();

    }
}

socrataDomainFinder.showDataTable();
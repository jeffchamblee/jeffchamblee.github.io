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

var dataCatalogSearch = {
    loadDomainDropdown: function (dropdown, url, nameattr) {
        //$(dropdown).empty();
        $.getJSON(url, {}, function (data) {
           //sort by domain name
            data.results.sort(function (a, b) {
                return a.domain.localeCompare(b.domain);
            });
            $.each(data.results, function (i, obj) {
                $(dropdown).append(
                    $('<option></option>')
                        .val(obj[nameattr])
                        .html(obj[nameattr])
                );
            });
        });
    },
    getUrlString: function () {
        var searchString;
        var domainString;
        var resourceTypeString;
        var domain = document.getElementById("domain").value;
        var resourceType = document.getElementById("resourceType").value;
        var searchText = document.getElementById('txtSearch').value;
        if (searchText === "") {
            searchString = "";
        } else {
            searchString = "&q=" + searchText;
        }
        if (domain === "all") {
            domainString = "";
        } else {
            domainString = "&domains=" + domain;
        }
        if (resourceType === "all") {
            resourceTypeString = "";
        } else {
            resourceTypeString = "&only=" + resourceType;
        }
        return "http://api.us.socrata.com/api/catalog/v1?limit=1000" + searchString + domainString + resourceTypeString;
    },
    searchKeyPress: function (e) {
        // look for window.event in case event isn't passed in
        e = e || window.event;
        if (e.keyCode === 13) {
            document.getElementById('btnSearch').click();
            return false;
        }
        return true;
    },
    loadResultsIntoTable: function () {
        var urlString = this.getUrlString();
        //console.log(urlString);
        $('#catalog_table').dataTable({
            destroy: true,
            "ajax": {
                "processing": true,
                "url": urlString,
                "dataSrc": "results"
            },
            "columns": [
                {"data": "resource.name"},
                {"data": "resource.description"},
                {"data": "resource.type"},
                {"data": "classification.categories"},
                {"data": "classification.tags"},
                {"data": "link",
                    "fnCreatedCell": function (nTd, sData, oData) {
                        $(nTd).html("<a href='" + oData.link + "'>" + oData.link + "</a>");
                    }
                }
            ]
        });
        columnSearch.makeColumnsSearchable();
    },
    showTable: function () {
        var lTable = document.getElementById("catalog_table");
        lTable.style.display = "table";
    },
    hideTable: function () {
        var lTable = document.getElementById("catalog_table");
        lTable.style.display = "none";
    },
    onChangeDomain: function () {
        this.loadResultsIntoTable();
        this.showTable();
        return true;
    },
    onChangeResourceType: function () {
        this.loadResultsIntoTable();
        this.showTable();
        return true;
    },
    onSearch: function () {
        this.loadResultsIntoTable();
        this.showTable();
        return true;
    }
};


//on startup, hide results table and load domain dropdown
dataCatalogSearch.hideTable();
dataCatalogSearch.loadDomainDropdown($('select#domain').get(0), 'http://api.us.socrata.com/api/catalog/v1/domains', 'domain');

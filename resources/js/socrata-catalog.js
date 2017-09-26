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
    catalog_query: "http://api.us.socrata.com/api/catalog/v1?only=datasets&limit=10000&order=page_views_last_month",
    loadDomainDropdown: function (dropdown, url, nameattr, domain) {
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
            // select domain
            if (domain) {
                $(dropdown).val(domain);
            }
        });
    },
    getUrlString: function () {
        var domainString;
        var domain = document.getElementById("domain").value;
        if (domain === "all") {
            domainString = "";
        } else {
            domainString = "&domains=" + domain;
        }
        return this.catalog_query + domainString;
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
    loadResultsIntoTable: function (urlString) {
        $('#catalog_table').dataTable({
            destroy: true,
            "order": [[3, "desc"]],
            "ajax": {
                "processing": true,
                "cache": true,
                "url": urlString,
                "dataSrc": "results"
            },
            "columns": [
                {"data": "resource.name"},
                {"data": "resource.description"},
                {"data": "classification.domain_category", "defaultContent": ""},
                {"data": "resource.page_views.page_views_last_month"},
                {"data": "resource.updatedAt", "title": "Modified Date",
                    "render": function (data) {
                        return moment(data).format('YYYY-MM-DD');
                    }
                },
                {"data": "owner.display_name"},
                {"data": "link",
                    "fnCreatedCell": function (nTd, sData, oData) {
                        $(nTd).html("<a href='" + oData.permalink + "'>" + oData.permalink + "</a>");
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
        var urlString = this.getUrlString();
        this.loadResultsIntoTable(urlString);
        this.showTable();
        return true;
    },
    onChangeResourceType: function () {
        var urlString = this.getUrlString();
        this.loadResultsIntoTable(urlString);
        this.showTable();
        return true;
    },
    onSearch: function () {
        var urlString = this.getUrlString();
        this.loadResultsIntoTable(urlString);
        this.showTable();
        return true;
    }
};

jQuery(document).ready(function () {
    //get URL parameter "domain"
    var domain = location.search.split('domain=')[1];
    if (domain) {
        var urlString = dataCatalogSearch.catalog_query + "&domains=" + domain;
        dataCatalogSearch.loadResultsIntoTable(urlString);
        dataCatalogSearch.showTable();
        dataCatalogSearch.loadDomainDropdown($('select#domain').get(0), 'http://api.us.socrata.com/api/catalog/v1/domains', 'domain', domain);
    } else {
        //on startup, hide results table and load domain dropdown
        dataCatalogSearch.hideTable();
        dataCatalogSearch.loadDomainDropdown($('select#domain').get(0), 'http://api.us.socrata.com/api/catalog/v1/domains', 'domain');
    }
});

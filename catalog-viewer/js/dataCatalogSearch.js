var domain = "data.cms.gov";
var urlString;

function loadDomainDropdown(dropdown, url, nameattr) {
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
}

function getUrlString() {
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
}

function searchKeyPress(e) {
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById('btnSearch').click();
        return false;
    }
    return true;
}

function loadResultsIntoTable() {
    urlString = getUrlString();
    $('#catalog_table').dataTable({
        destroy: true,
        "ajax": {
            "processing" : true,
            "url": urlString,
            "dataSrc" : "results"
        },
        "columns": [
            { "data" : "resource.name" },
            { "data" : "resource.description" },
            { "data" : "resource.type" },
            { "data" : "classification.categories" },
            { "data" : "classification.tags" },
            { "data" : "link",
                    "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<a href='" + oData.link + "'>" + oData.link + "</a>");
                }
                }
        ]
    });
}



function showTable() {
    var lTable = document.getElementById("catalog_table");
    lTable.style.display =  "table";
}

function hideTable() {
    var lTable = document.getElementById("catalog_table");
    lTable.style.display =  "none";
}

function onChangeDomain() {
    loadResultsIntoTable();
    showTable();
    return true;
}

function onChangeResourceType() {
    loadResultsIntoTable();
    showTable();
    return true;
}

function onSearch() {
    loadResultsIntoTable();
    showTable();
    return true;
}

//on startup, hide results table and load domain dropdown
hideTable();
loadDomainDropdown($('select#domain').get(0), 'http://api.us.socrata.com/api/catalog/v1/domains', 'domain');

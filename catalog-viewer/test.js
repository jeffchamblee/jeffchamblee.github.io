var domain = "data.cms.gov";
var urlString;

function loadDropdown(dropdown, url, nameattr) {
    $(dropdown).empty();
    $.getJSON(url, {}, function (data) {
       //sort by domain name
        data.results.sort(function (a, b) {
            return a.domain.localeCompare(b.domain);
        });
       //console.log(data);
        $.each(data.results, function (i, obj) {
            $(dropdown).append(
                $('<option></option>')
                    .val(obj[nameattr])
                    .html(obj[nameattr])
            );
        });
    });
}

function loadDataIntoTable(domain) {
    //console.log(domain);
    urlString = "http://api.us.socrata.com/api/catalog/v1?domains=" + domain + "&only=datasets&limit=1000";
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

function OnChange(dropdown) {
    var myindex  = dropdown.selectedIndex;
    domain = dropdown.options[myindex].value;
    loadDataIntoTable(domain);
    return true;
}

loadDropdown($('select#domain').get(0), 'http://api.us.socrata.com/api/catalog/v1/domains', 'domain');

var domain = "data.cms.gov";
var urlString;

function loadDataIntoTable(domain) {
    console.log(domain);
    urlString = "http://api.us.socrata.com/api/catalog/v1?domains=" + domain + "&only=datasets";
    $('#catalog_table').dataTable({
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
            { "data" : "resource.updatedAt" },
            { "data" : "link" }
        ]
    });
}

function OnChange(dropdown) {
    var myindex  = dropdown.selectedIndex;
    domain = dropdown.options[myindex].value;
    loadDataIntoTable(domain);
    return true;
}

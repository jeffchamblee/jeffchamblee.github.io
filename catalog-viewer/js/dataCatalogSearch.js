var searchText;
var urlString;

function hideTable() {
    var lTable = document.getElementById("catalog_table");
    lTable.style.display =  "none";
}

function showTable() {
    var lTable = document.getElementById("catalog_table");
    lTable.style.display =  "table";
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

function search() {
    searchText = document.getElementById('txtSearch').value;
    //console.log(searchText);
    urlString = "http://api.us.socrata.com/api/catalog/v1?q=" + searchText + "&only=datasets&limit=1000";
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
    showTable();
}

//on startup, hide the HTML table
hideTable();

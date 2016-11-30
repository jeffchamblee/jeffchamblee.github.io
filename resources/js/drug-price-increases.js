"use strict";

var columnSearch = {
    makeColumnsSearchable: function () {
        // Setup - add a text input to the footer cells
        $('#drug_price_increase_table tfoot th:first').each(function () {
            var title = $('#drug_price_increase_table thead th').eq($(this).index()).text();
            $(this).html('<input type="text" class="colSearch" placeholder="Search ' + title + '" />');
        });

        // Apply the search
        var dataTable = $('#drug_price_increase_table').DataTable();
        dataTable.columns().every(function () {
            var that = this;
            $('.colSearch', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });

        //move footers to the top
        var row = $('#drug_price_increase_table tfoot tr');
        row.find('th').each(function () {
            $(this).css('padding', 8);
        });
        $('#drug_price_increase_table thead').append(row);
    }
};

var drugPriceIncrease = {
    datasetUrl: "https://data.medicaid.gov/resource/tau9-gfwr.json",
    getQueryUrl: function (date) {
        return this.datasetUrl + "?as_of_date=" + date;
    },
    init: function () {
        $("#drug_price_increase_table").hide();
        $("#loading-animation").hide();
    },
    main: function () {
        $("#loading-animation").show();
        this.startDate = dateFormatter.formatYYYY(dateRangeSelector.getStartDate());
        this.endDate = dateFormatter.formatYYYY(dateRangeSelector.getEndDate());
        //$("#status1").html("Please wait...");
        //document.getElementById("status1").textContent = "Reading drug prices for " + this.startDate + " and " + this.endDate + ". Please wait...";
        //$.notify("Alert!", {type:"info"});
        alertify.message('Reading drug prices for ' + this.startDate + " and " + this.endDate);
        console.log("Start Date: " + this.startDate);
        console.log("End Date: " + this.endDate);
        //setTimeout allows redraw of DOM so "Please wait" message appears in Chrome
        const parent = this;
        setTimeout(function () {parent.getDataForTwoPointsInTime();}, 1000);
        //this.getDataForTwoPointsInTime();
    },
    getDataForTwoPointsInTime: function () {
        const midnight = "T00:00:00.000";
        var startUrl = this.getQueryUrl(this.startDate + midnight);
        var endUrl = this.getQueryUrl(this.endDate + midnight);
        const parent = this;
        $.when(
            parent.startPriceList = this.getAllBatches(startUrl, "&$select=ndc,nadac_per_unit"),
            console.log(parent.startPriceList.length.toLocaleString() + " records found for " + this.startDate),
            alertify.message(parent.startPriceList.length.toLocaleString() + " records found for " + this.startDate),
            parent.endPriceList = this.getAllBatches(endUrl, "&$select=ndc,ndc_description,nadac_per_unit, pricing_unit,pharmacy_type_indicator,otc,explanation_code,classification_for_rate_setting"),
            console.log(parent.endPriceList.length.toLocaleString() + " records found for " + this.endDate),
            alertify.message(parent.endPriceList.length.toLocaleString() + " records found for " + this.endDate)
            //setTimeout allows redraw of DOM so "Please wait" message appears in Chrome
        ).then(setTimeout(function () {
            var resultList = parent.matchListsOnNdc();
            parent.display(resultList);
        }, 1000));
    },
    getAllBatches: function (url, selectClause) {
        var startTime = Date.now();
        const BATCH_SIZE = 1000;
        //var SOCRATA_QUERY_SELECT = "?$select=data_set_name, organization_name, main_phone_number, street_address, city, state_or_territory, zip_code, display";
        //var SOCRATA_QUERY_WHERE = "&$where=display=%27YES%27";
        var SOCRATA_OFFSET;
        var SOCRATA_URL;
        var allRecords = [];
        var currentBatch;
        var index = 0;
        while (true) {
            SOCRATA_OFFSET = "&$offset=" + index;
            //SOCRATA_URL = SOCRATA_DATA_SET_URL + SOCRATA_QUERY_SELECT + SOCRATA_QUERY_WHERE + SOCRATA_QUERY_ORDER + SOCRATA_OFFSET;
            SOCRATA_URL = url + "&$order=:id" + SOCRATA_OFFSET + selectClause;
            //console.log(SOCRATA_URL);
            currentBatch = this.getJsonData(SOCRATA_URL);
            allRecords = allRecords.concat(currentBatch);
            if (currentBatch.length < BATCH_SIZE) {
                break;
            }
            index += BATCH_SIZE;
        }
        var elapsedTime = Date.now() - startTime;
        console.log("getAllBatches elapsed time: " + elapsedTime);
        return allRecords;
    },
    getJsonData: function (url) {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.setRequestHeader("X-App-Token", "nQvhzxnwOVgLKyFGvRsMfruH4");
        xmlHttp.send();
        return jQuery.parseJSON(xmlHttp.responseText);
    },
    // create a list of NDCs to be used as an index into startPriceList
    createIndex: function () {
        var startTime = Date.now();
        var startIndex = [];
        var index1;
        for (index1 = 0; index1 < this.startPriceList.length; index1++) {
            startIndex.push(this.startPriceList[index1].ndc);
        }
        var elapsedTime = Date.now() - startTime;
        console.log("createIndex elapsed time: " + elapsedTime);
        return startIndex;
    },
    //match lists based on NDC
    matchListsOnNdc: function () {
        var startTime = Date.now();
        var record;
        var startRecord;
        var startRecordIndex;
        var endRecord;
        var list = [];
        var index1;
        var increase;
        var pctIncrease;
        var ndc;
        var startIndex = this.createIndex();
        for (index1 = 0; index1 < this.endPriceList.length; index1++) {
            endRecord = this.endPriceList[index1];
            ndc = endRecord.ndc;
            startRecordIndex = startIndex.indexOf(ndc);
            //if (startRecordIndex === -1) { record not found }
            if (startRecordIndex !== -1) {
                startRecord = this.startPriceList[startRecordIndex];
                //compute dollar increase & percent increase
                increase = endRecord.nadac_per_unit - startRecord.nadac_per_unit;
                pctIncrease = (increase / startRecord.nadac_per_unit) * 100.0;
                record = {
                    ndc: endRecord.ndc,
                    description: endRecord.ndc_description,
                    pricing_unit: endRecord.pricing_unit,
                    end_price: endRecord.nadac_per_unit,
                    begin_price: startRecord.nadac_per_unit,
                    increase: increase,
                    pct_increase: pctIncrease,
                    pharmacy_type_indicator: endRecord.pharmacy_type_indicator,
                    otc: endRecord.otc,
                    explanation_code: endRecord.explanation_code,
                    classification_for_rate_setting: endRecord.classification_for_rate_setting
                };
                list.push(record);
            }
        }
        var elapsedTime = Date.now() - startTime;
        console.log("matchListsOnNdc elapsed time: " + elapsedTime);
        return list;
    },
    display: function (resultList) {
        var startTime = Date.now();
        const percent = resultList.length / this.endPriceList.length * 100.0;
        alertify.message(resultList.length.toLocaleString() + " records matched (" + percent.toFixed(2) + " percent)");
        console.log(resultList.length.toLocaleString() + " records matched (" + percent.toFixed(2) + " percent)");
        $("#status1").html(resultList.length.toLocaleString() + " records matched (" + percent.toFixed(2) + " percent)");
        if (resultList.length > 0) {
            $('#drug_price_increase_table').dataTable({
                data: resultList,
                "order": [[6, "desc"]],
                destroy: true,
                columns: [
                    {data: 'description'},
                    {data: 'ndc'},
                    {data: 'pricing_unit'},
                    {data: 'begin_price', render: $.fn.dataTable.render.number(',', '.', 2, '$')},
                    {data: 'end_price', render: $.fn.dataTable.render.number(',', '.', 2, '$')},
                    {data: 'increase', render: $.fn.dataTable.render.number(',', '.', 2, '$')},
                    {data: 'pct_increase', render: $.fn.dataTable.render.number(',', '.', 2, '')},
                    {data: 'pharmacy_type_indicator'},
                    {data: 'otc'},
                    {data: 'explanation_code'},
                    {data: 'classification_for_rate_setting'}
                ]
            });
            columnSearch.makeColumnsSearchable();
            $("#drug_price_increase_table").show();
        }
        $("#loading-animation").hide();
        var elapsedTime = Date.now() - startTime;
        console.log("display elapsed time: " + elapsedTime);
    }
};

drugPriceIncrease.init();
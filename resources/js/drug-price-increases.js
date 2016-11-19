"use strict";

var drugPriceIncrease = {
    datasetUrl: "https://data.medicaid.gov/resource/tau9-gfwr.json",
    getQueryUrl: function (date) {
        return this.datasetUrl + "?as_of_date=" + date;
    },
    init: function () {
        $("#drug_price_increase_table").hide();
    },
    main: function () {
        this.startDate = dateFormatter.formatYYYY(dateRangeSelector.getStartDate());
        this.endDate = dateFormatter.formatYYYY(dateRangeSelector.getEndDate());
        //$("#status1").html("Please wait...");
        document.getElementById("status1").textContent = "Reading drug prices for " + this.startDate + " and " + this.endDate + ". Please wait...";
        console.log("Start Date: " + this.startDate);
        console.log("End Date: " + this.endDate);
        //$.notify("Alert!", {type:"info"});
        alertify.message('Reading drug prices for ' + this.startDate + " and " + this.endDate);
		//force redraw of DOM so wait message appears in Chrome
		//setTimeout(this.getDataForTwoPointsInTime(), 1000);
		//$('#status-container').hide().show(0);
		//$(window).trigger('resize');
        this.getDataForTwoPointsInTime();
    },
    getDataForTwoPointsInTime: function () {
        var midnight = "T00:00:00.000";
        var startUrl = this.getQueryUrl(this.startDate + midnight);
        var endUrl = this.getQueryUrl(this.endDate + midnight);
        var parent = this;
        $.when(
            parent.startPriceList = this.getAllBatches(startUrl),
            console.log(parent.startPriceList.length.toLocaleString() + " records found for " + this.startDate),
            alertify.message(parent.startPriceList.length.toLocaleString() + " records found for " + this.startDate),
            parent.endPriceList = this.getAllBatches(endUrl),
            console.log(parent.endPriceList.length.toLocaleString() + " records found for " + this.endDate),
            alertify.message(parent.endPriceList.length.toLocaleString() + " records found for " + this.endDate)
        ).then(function () {
            var resultList = parent.matchListsOnNdc();
            parent.display(resultList);
        });
    },
    getAllBatches: function (url) {
        var BATCH_SIZE = 1000;
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
            SOCRATA_URL = url + SOCRATA_OFFSET;
            //console.log(SOCRATA_URL);
            currentBatch = this.getJsonData(SOCRATA_URL);
            allRecords = allRecords.concat(currentBatch);
            if (currentBatch.length < BATCH_SIZE) {
                break;
            }
            index += BATCH_SIZE;
        }
        return allRecords;
    },
    getJsonData: function (url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.setRequestHeader("X-App-Token", "nQvhzxnwOVgLKyFGvRsMfruH4");
        xmlHttp.send();
        return jQuery.parseJSON(xmlHttp.responseText);
    },
    //match lists based on NDC
    matchListsOnNdc: function () {
        var record;
        var list = [];
        var index1;
        var index2;
        var increase;
        var pctIncrease;
        for (index1 = 0; index1 < this.endPriceList.length; index1++) {
            for (index2 = 0; index2 < this.startPriceList.length; index2++) {
                if (this.startPriceList[index2].ndc === this.endPriceList[index1].ndc) {
                    //compute dollar increase & percent increase
                    increase = this.endPriceList[index1].nadac_per_unit - this.startPriceList[index2].nadac_per_unit;
                    pctIncrease = (increase / this.startPriceList[index2].nadac_per_unit) * 100.0;
                    record = {
                        ndc: this.endPriceList[index1].ndc,
                        description: this.endPriceList[index1].ndc_description,
                        pricing_unit: this.endPriceList[index1].pricing_unit,
                        end_price: this.endPriceList[index1].nadac_per_unit,
                        begin_price: this.startPriceList[index2].nadac_per_unit,
                        increase: increase,
                        pct_increase: pctIncrease,
                        pharmacy_type_indicator: this.endPriceList[index1].pharmacy_type_indicator,
                        otc: this.endPriceList[index1].otc,
                        explanation_code: this.endPriceList[index1].explanation_code,
                        classification_for_rate_setting: this.endPriceList[index1].classification_for_rate_setting
                    };
                    list.push(record);
                    break;
                }
            }
        }
        return list;
    },
    display: function (resultList) {
        var percent = resultList.length / this.endPriceList.length * 100.0;
        alertify.message("Records matched: " + resultList.length.toLocaleString() + " (" + percent.toFixed(2) + " percent)");
        console.log("Records matched: " + resultList.length.toLocaleString() + " (" + percent.toFixed(2) + " percent)");
        $("#status1").html("Records matched: " + resultList.length.toLocaleString() + " (" + percent.toFixed(2) + " percent)");
        if (resultList.length > 0) {
            $("#drug_price_increase_table").show();
            //sort by percent increase
            resultList.sort(function (a, b) { return b.pct_increase - a.pct_increase;});
            $('#drug_price_increase_table').dataTable({
                data: resultList,
                "order": [[6, "desc"]],
                columns: [
                    {data: 'description'},
                    {data: 'ndc'},
                    {data: 'pricing_unit'},
                    {data: 'begin_price',  render: $.fn.dataTable.render.number( ',', '.', 2, '$' )},
                    {data: 'end_price',  render: $.fn.dataTable.render.number( ',', '.', 2, '$' )},
                    {data: 'increase', render: $.fn.dataTable.render.number(',', '.', 2, '$')},
                    {data: 'pct_increase', render: $.fn.dataTable.render.number(',', '.', 2, '')},
                    {data: 'pharmacy_type_indicator'},
                    {data: 'otc'},
                    {data: 'explanation_code'},
                    {data: 'classification_for_rate_setting'}
                ]
            });
        }
    }
};

drugPriceIncrease.init();
"use strict";

var drugPriceIncrease = {
    datasetUrl: "https://data.medicaid.gov/resource/tau9-gfwr.json",
    getQueryUrl: function (date) {
        return this.datasetUrl + "?as_of_date=" + date;
    },
    main: function () {
        $(".price_increase").remove();
        this.startDate = dateFormatter.format(dateRangeSelector.getStartDate());
        this.endDate = dateFormatter.format(dateRangeSelector.getEndDate());
        console.log("Start Date: " + this.startDate);
        console.log("End Date: " + this.endDate);
		var midnight = "T00:00:00.000"
        var startUrl = this.getQueryUrl(this.startDate + midnight);
        var endUrl = this.getQueryUrl(this.endDate + midnight);
        //$("#status1").html("Reading drug prices for ");
        //$.notify("Alert!", {type:"info"});
        alertify.message('Reading drug prices for ' + this.startDate + " and " + this.endDate);
        this.getDataForTwoPointsInTime(startUrl, endUrl);
    },
    getDataForTwoPointsInTime: function (startUrl, endUrl) {
        var parent = this;
        $.when(
            //$.getJSON(startUrl, function (data) {
            //    parent.startPriceList = data;
            //}),
            //$.getJSON(endUrl, function (data) {
            //    parent.endPriceList = data;
            //})
            parent.startPriceList = this.getAllBatches(startUrl),
            parent.endPriceList = this.getAllBatches(endUrl)
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
        xmlHttp.setRequestHeader("X-App-Token", "VWC4E6UydFEcimXx7vZnja4z7");
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
                if (this.startPriceList[index2].ndc == this.endPriceList[index1].ndc) {
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
                        pct_increase: pctIncrease
                    };
                    list.push(record);
                    break;
                }
            }
        }
        return list;
    },
    display: function (resultList) {
        console.log("Records found: " + this.startPriceList.length);
        console.log("Records found: " + this.endPriceList.length);
        var percent = resultList.length / this.endPriceList.length * 100.0;
        console.log("Records matched: " + resultList.length + " (" + percent.toFixed(2) + " percent)");
        $("#status3").html("Records matched: " + resultList.length + " (" + percent.toFixed(2) + " percent)");
        //sort by percent increase
        resultList.sort(function (a, b) { return b.pct_increase - a.pct_increase;});
        var index;
        var record;
        for (index = 0; index < resultList.length; index++) {
            record = resultList[index];
            $("#drug_price_increase_table").append(
            "<tr class=\"price_increase\">" + "\n\t\t" +
            "<td>" + (record.description) + "</td>" + "\n\t\t" +
            "<td>" + (record.ndc) + "</td>" + "\n\t\t" +
            "<td>" + (record.pricing_unit) + "</td>" + "\n\t\t" +
            "<td class=\"right_align\">" + (record.begin_price) + "</td>" + "\n\t\t" +
            "<td class=\"right_align\">" + (record.end_price) + "</td>" + "\n\t\t" +
            "<td class=\"right_align\">" + (record.increase.toFixed(2)) + "</td>" + "\n\t\t" +
            "<td class=\"right_align\">" + (record.pct_increase.toPrecision(4)) + "</td>" + "\n\t\t" +
            "</tr>" + "\n"
            );
        }

    }
};

//drugPriceIncrease.main();
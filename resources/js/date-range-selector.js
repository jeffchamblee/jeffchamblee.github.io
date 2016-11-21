"use strict";

var dateFormatter = {
    // YYYY-MM-DD
    formatYYYY: function (date) {
        return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    },
    // MM/DD/YYYY
    formatMM: function (date) {
        return ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + "/" + date.getFullYear();
    }
};


//NADAC data is usually published on Wednesday each week
var dateAdjuster = {
    // change date to Wednesday of the specified week
    getWednesday: function (date) {
        var newDate = date;
        var diff = 3 - date.getDay();
        newDate.setDate(date.getDate() + diff);
        return newDate;
    },
    // change date to Thursday of the specified week
    getThursday: function (date) {
        var newDate = date;
        var diff = 4 - date.getDay();
        newDate.setDate(date.getDate() + diff);
        return newDate;
    },
    getDatePublished: function (dateSelected) {
        var date1 = new Date("2013-11-24");
        var date2 = new Date("2013-12-08");
        if (dateSelected >= date1 && dateSelected < date2) {
            return this.getThursday(dateSelected);
        } else {
            return this.getWednesday(dateSelected);
        }
    }
};

var dateRangeSelector = {
    from: $("#datepicker_start").datepicker({
        defaultDate: "-1M",
        minDate: "11/24/2013",
        maxDate: "-1d",
        changeMonth: true,
        changeYear: true
    }),
    to: $("#datepicker_end").datepicker({
        minDate: "12/05/2013",
        maxDate: "+2D",
        changeMonth: true,
        changeYear: true
    }),
    init: function () {
        $("#datepicker_start").val("12/30/2015");
        $("#datepicker_end").val("11/16/2016");
        var parent = this;
        parent.from.on("change", function () {
            // change date to Wednesday of the specified week, or Thursday if appropriate
            $("#datepicker_start").val(dateFormatter.formatMM(dateAdjuster.getDatePublished(parent.getDate(this))));
            parent.to.datepicker("option", "minDate", parent.getDate(this));
        });
        parent.to.on("change", function () {
            // change date to Wednesday of the specified week, or Thursday if appropriate
            $("#datepicker_end").val(dateFormatter.formatMM(dateAdjuster.getDatePublished(parent.getDate(this))));
            parent.from.datepicker("option", "maxDate", parent.getDate(this));
        });
    },
    getStartDate: function () {
        return this.from.datepicker("getDate");
    },
    getEndDate: function () {
        return this.to.datepicker("getDate");
    },
    getDate: function (element) {
        var dateFormat = "mm/dd/yy";
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }
        return date;
    }
};

dateRangeSelector.init();

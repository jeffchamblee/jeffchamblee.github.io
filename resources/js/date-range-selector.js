"use strict";

var dateRangeSelector = {
    from: $("#datepicker_start").datepicker({
		//dateFormat:"yyyy-mm-dd",
        defaultDate: "-1M",
        minDate: "11/28/2013",
        maxDate: "-1d",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 2
    }),
    to: $("#datepicker_end").datepicker({
        minDate: "12/05/2013",
        maxDate: "+2D",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 2
    }),
    init: function () {
        $("#datepicker_start").val("12/30/2015");
        $("#datepicker_end").val("11/16/2016");
        var parent = this;
        parent.from.on("change", function () {
            parent.to.datepicker("option", "minDate", parent.getDate(this));
        });
        parent.to.on("change", function () {
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

var dateFormatter = {
	format: function (date) {
        return date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) ;  // 2015-05-16
	},
};


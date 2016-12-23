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


//NADAC data is usually published on Wednesday each week,
//but was published on Thursday two weeks in 2013.
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
        //defaultDate: "-1M",
        minDate: "11/24/2013",
        maxDate: "-1d",
        changeMonth: true,
        changeYear: true
    }),
    to: $("#datepicker_end").datepicker({
        //defaultDate: new Date(),
        minDate: "12/05/2013",
        maxDate: "+2D",
        changeMonth: true,
        changeYear: true
    }),
    init: function () {
        //$("#datepicker_start").val("12/30/2015");
        //$("#datepicker_end").val("11/16/2016");
		var startDate = new Date();
		startDate.setMonth(startDate.getMonth() - 3);
		$('#datepicker_start').datepicker('setDate', dateAdjuster.getDatePublished(startDate));
		var endDate = new Date();
		endDate.setDate(endDate.getDate() - 7);
		$('#datepicker_end').datepicker('setDate', dateAdjuster.getDatePublished(endDate));
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

var monthRangeSelector = {
    init: function () {
        var parent = this;
        parent.from.on("change", function () {
            //$("#month_picker_start").val(dateFormatter.formatMM(parent.getDate(this)));
            parent.to.datepicker("option", "minDate", parent.getDate(this));
        });
        parent.to.on("change", function () {
            //$("#month_picker_end").val(dateFormatter.formatMM(parent.getDate(this)));
            parent.from.datepicker("option", "maxDate", parent.getDate(this));
        });
    },
	startDate: new Date(),
    from: $("#month_picker_start").datepicker({
        defaultDate: new Date(2016, 3 - 1, 1),
        minDate: new Date(2016, 3 - 1, 1),
        maxDate: "1d",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'MM yy',
        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div  .ui-datepicker-year :selected").val();
			monthRangeSelector.startDate = new Date(year, month, 1);
		    $(this).datepicker('setDate', monthRangeSelector.startDate);
        }
    }),
	endDate: new Date(),
    to: $("#month_picker_end").datepicker({
        minDate: new Date(2016, 4 - 1, 1),
        maxDate: "1D",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'MM yy',
        onClose: function(dateText, inst) { 
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div  .ui-datepicker-year :selected").val();
			monthRangeSelector.endDate = new Date(year, month, 1);
            $(this).datepicker('setDate', monthRangeSelector.endDate);
        }
    }),
    getStartDate: function () {
        return this.startDate;
    },
    getEndDate: function () {
        return this.endDate;
    }
};

monthRangeSelector.init();
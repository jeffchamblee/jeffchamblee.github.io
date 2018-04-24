"use strict";

var selectGroupBy = document.getElementById('select-groupby');
var datasetTimeline = {
    getData: function () {
        var t = this;
        $.getJSON("//jeffchamblee.github.io/resources/data/dmg-dataset-launch-dates.json", function (data) {
            t.launchdates = data;
            //console.log(t.launchdates.length);
            datasetTimeline.timeline = milestones('#timeline')
                .mapping({
                    timestamp: 'date_time',
                    text: 'title'
                });
          datasetTimeline.update();
        });
    },
    update: function () {
        datasetTimeline.timeline
            .parseTime('%Y-%m-%dT%H:%M')
            .aggregateBy(selectGroupBy.options[selectGroupBy.selectedIndex].value)
            .optimize(true)
            .render(datasetTimeline.launchdates);
    }
};
datasetTimeline.getData();
selectGroupBy.onchange = datasetTimeline.update;

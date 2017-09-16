"use strict";
var topNavButtons = {
        createListeners: function() {
                //buttons
                $("#open-data-1").click(function() {
                    window.location.href = "/catalog-viewer/SocrataDomains.html";
                });
                $("#open-data-2").click(function() {
                    window.location.href = "/catalog-viewer/DataCatalogSearch.html";
                });
                $("#quiz-yourself").click(function() {
                    window.location.href = "/quizzes/index.html";
                });
                $("#data-viz").click(function() {
                    window.location.href = "/medicaid/charts/index.html";
                });
                $("#drug-price").click(function() {
                    window.location.href = "/drug-prices/DrugPriceIncrease.html";
                });
        }
};


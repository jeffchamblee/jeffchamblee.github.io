"use strict";

var topNavButtons = {
        createListeners: function() {
                console.log("createListeners");
                //buttons
                $("#open-data-1").click(function(){
                    console.log("click 1");
                    window.location.href = "/catalog-viewer/SocrataDomains.html";
                }); 
                $("#open-data-2").click(function(){
                    window.location.href = "/catalog-viewer/DataCatalogSearch.html";
                }); 
                $("#web-app-security").click(function(){
                    window.location.href = "/owasp-quiz/OWASPQuiz1.html";
                }); 
                $("#data-viz").click(function(){
                    window.location.href = "/medicaid/charts/index.html";
                }); 
                $("#drug-price").click(function(){
                    window.location.href = "/drug-prices/DrugPriceIncrease.html";
                });          
        }
};

$(document).ready(function() {
    console.log("topNavButtons");
    topNavButtons.createListeners();
});


"use strict";
var google_forms = {
    	postContactToGoogle: function() {
	}
};

/*
<form action="https://docs.google.com/forms/d/e/1FAIpQLScmBavU2jPgx1mhsgt0Rkv3SFXEeeXL_NB-9DDeoT7xw662Tg/formResponse" target="_self" method="POST" id="mG61Hd">
*/
  function postContactToGoogle() {
  	var email = $('#Email').val();
  	var first = $('#First').val();
  	var last = $('#Last').val();
  	var company = $('#Company').val();
  	$.ajax({
  		url: "https://docs.google.com/forms/d/e/1FAIpQLScmBavU2jPgx1mhsgt0Rkv3SFXEeeXL_NB-9DDeoT7xw662Tg/formResponse",
  		data: {
  			"entry.556688774": email,
  			"entry.984740580": first,
  			"entry.1575818499": last,
  			"entry.1575257528": company
  		},
  		type: "POST",
  		dataType: "xml",
  		statusCode: {
  			0: function() {
  				window.location.replace("ThankYou.html");
  			},
  			200: function() {
  				window.location.replace("ThankYou.html");
  			}
  		}
  	});
  }
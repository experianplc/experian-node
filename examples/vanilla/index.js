'use strict';
var Experian = require('../../lib/experian');

//Create instance of Experian API
var myExperianAPI = new Experian(CLIENT_ID, CLIENT_SECRET);
 
//Login Method - Returns a promise
myExperianAPI.login(EXPERIAN_USERNAME,EXPERIAN_PASSWORD)
.then((result)=> {
	
    //Make a request to the business - Business Headers API with a BIN and Subcode
	myExperianAPI.business.us.headers({
		subcode:"1234567",
		bin:"1234567"
	})
	.then(function(data) {
		//Success
		console.log(data);
	}, function(error) {
		//Error
		console.error(error);
	});
	
});
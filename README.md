# Experian API Node.js Library

The Experian Node library provides convenient access to the REST Experian APIs from applications written in server-side JavaScript.

Please keep in mind that this package is for use with server-side Node that
uses Experian client_id, client_secret, username, password and subcode (if applicable).

## Documentation

Experian API documentation can be @ [Experian](https://developer.experian.com/)

## Installation

Install the package with:

    npm install experian-node --save

## Usage

The package needs to be configured with your account's client_id, client_secret which is available in your [Experan My Apps](https://developer.experian.com/apps). Require it with the key's value:

``` js
var Experian = require('experian-node');

//Create instance of Experian API
var myExperianAPI = new Experian(CLIENT_ID,CLIENT_SECRET);
 
//Login Method - Returns a promise
myExperianAPI.login(username,password)
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
```

## Methods

### Login
```js
login(username, password)
```

### Get API Field
```js
getApiField(key)
```

### Set Timeout
```js
setTimeout(timeout)
```

### Set API Version
```js
setApiVersion(version)
```

### Set API Key
```js
setApiKey(access_token)
```

### US Business

#### Search
```js
business.us.search({
  "name":"Experian",
  "street":"475 Anton Blvd",
  "city":"Costa Mesa",
  "state":"CA",
  "zip":"92626",
  "phone":"8772847942",
  "geo":true,
  "subcode":"0563736"
})
```

#### Headers
```js
business.us.headers({
  "bin":"807205801",
  "subcode":"0563736"
})
```

##### Business Facts
```js
business.us.facts({
  "bin":"722799117",
  "subcode":"0563736"
})
```

##### Fraud Shields
```js
business.us.fraudShields({
    "bin":"807205801",
    "subcode":"0563736"
})
```

##### Risk Dashboards
```js
business.us.riskDashboards({
  "bin":"700000001",
  "subcode":"0563736"
})
```

##### Bankruptcies
```js
business.us.bankruptcies({
  "bin":"404197602",
  "subcode":"0563736",
  "bankruptcySummary":true,
  "bankruptcyDetail":true
})
```

##### Scores
```js
business.us.scores({
  "bin":"700000001",
  "subcode":"0563736",
  "commercialScore":true,
  "fsrScore":true
})
```

##### Trades
```js
business.us.trades({
  "bin":"700000001",
  "subcode":"0563736",
  "tradePaymentSummary":true,
  "tradePaymentTotals":true,
  "tradePaymentExperiences":true,
  "tradePaymentTrends":true
})
```

##### Credit Status
```js
business.us.creditStatus({
  "bin":"700969989",
  "subcode":"0563736"
})
```

##### Corporate Linkage
```js
business.us.corporateLinkage({
  "bin":"700513485",
  "subcode":"0563736",
  "corporateLinkagePartial": true,
  "corporateLinkageFull": true
})
```

##### Legal Collection Summaries
```js
business.us.legalCollectionSummaries({
    "bin":"700969989",
    "subcode":"0563736",
    "legalFilingsCollectionsSummary":true,
    "legalFilingsSummary":true
})
```

##### Liens
```js
business.us.liens({
    "bin":"700969989",
    "subcode":"0563736",
    "lienSummary":true,
    "lienDetail":true
})
```

##### Judgements
```js
business.us.judgments({
  "bin":"700969989",
  "subcode":"0563736",
  "judgmentSummary":true,
  "judgmentDetail":true
})
```

##### Collections
```js
business.us.collections({
  "bin":"700954701",
  "subcode":"0563736",
  "collectionsSummary":true,
  "collectionsDetail":true
})
```

##### UCC Filings
```js
business.us.uccFilings({
    "bin":"700000001",
    "subcode":"0563736",
    "uccFilingsSummary":true,
    "uccFilingsDetail":true
})
```

##### Corporate Registrations
```js
business.us.corporateRegistrations({
  "bin":"700000001",
  "subcode":"0563736"
})
```

##### Contacts
```js
business.us.businessContacts({
  'bin': '716612304',
  'subcode': '0563736'
})
```

##### Reverse Addresses
```js
business.us.reverseAddresses({
  "subcode": "0517614",
  "street": "475 ANTON BLVD",
  "city": "Costa Mesa",
  "state": "CA",
  "zip": "92626"
})
```

##### Reverse Phones
```js
business.us.reversePhones({
  "subcode": "0517614",
  "phone": "8008888888"
})
```

#####  Reverse TaxIDs
```js
business.us.reverseTaxIDs({
  "subcode": "0563736",
  "taxId": "222152871"
})
```

##### Scores Search
```js
business.us.scoresSearch({
    "name": "Experian",
    "city": "Costa Mesa",
    "state": "CA",
    "subcode": "179116",
    "street": "535 ANTON BLVD",
    "zip": "92626",
    "phone": "9495673800",
    "taxId": "176970333",
    "geo": true,
    "comments": "testing",
    "modelCode": "000224",
    "matchReliabilityCode": 83,
    "commercialScore": true,
    "fsrScore": true
})
```

##### Premier Profiles
```js
business.us.reportsPremierProfiles({
  "bin": "706589164",
  "subcode": "0563736",
  "modelCode": "000224",
  "comments": "12345"
})
```

##### Premier Profiles HTML
```js
business.us.reportsPremierProfilesHtml({
  "bin": "706589164",
  "subcode": "0563736",
  "modelCode": "000224",
  "comments": "12345"
})
```

#####  Aggregates
```js
business.us.aggregates({
  "subcode": "0517614",
  "bin": "796744203",
  "extraAggs": true
})
```

#####  MultiSegments
```js
business.us.multisegments({
  "dataPoints": ["bankruptcyDetail", "bankruptcySummary", "collectionsDetail", "collectionsSummary", "businessContacts"],
  "bin": "700000001",
  "subcode": "0563736"
})
```

### SBCS

#####  Headers
```js
sbcs.us.headers({
  'bin': '987523317',
  'subcode': '0517614'
})
```

#####  Aggregates
```js
sbcs.us.aggregates({
  "subcode": "0517614",
  "bin": "796744203",
  "extraAggs": true
})
```

#####  HTML Report
```js
sbcs.us.reportsSbcsHtml({
  "bin": "702596911",
  "subcode": "0517614"
})
```

### Consumer Credit Profile

#####  Credit Reports
```js
sbcs.us.creditReports({
  "creditProfile": {
    "subscriber": {
        "preamble": "TEST",
        "subscriberCode": "5991764"
    },
    "primaryApplicant": {
        "name": {
            "surname": "CONSUMER",
            "firstName": "JONATHAN",
            "middleName": "",
            "generationCode": ""
        },
        "ssn": "999999990",
        "dob": "1985"
    },
    "address": {
        "currentAddress": {
            "street": "10655 NORTH BIRCH STREET",
            "city": "BURBANK",
            "state": "CA",
            "zipCode": "91502"
        }
    },
    "otherInformation": {
        "referenceNumber": "CR API",
        "permissiblePurposeType": {
            "type": "",
            "terms": "",
            "abbreviatedAmount": ""
        },
        "paymentHistory84": "N"
    },
    "addOns": {
        "directCheck": "",
        "demographics": {
            "demographicsAll": "N",
            "demographicsPhone": "N",
            "demographicsGeoCode": "N"
        },
        "riskModels": {
            "modelIndicator": [
                "F", "3", "B"
            ],
            "scorePercentile": "",
            "profileSummary": "Y",
            "fraudShield": "Y",
            "mla": "",
            "ofac": "",
            "ofacmsg": "",
            "staggSelect": "",
            "uniqueConsumerIdentifier": {
                "getUniqueConsumerIdentifier": ""
            }
        },
        "options": { "optionId": [""] }
    }
  }
})
```

### BOP

#####  BOP Reports
```js
sbcs.us.reportsBop({
  "subcode":"0517614",
  "comments":"This is a comment field",
  "businessOwners":[  
      {  
        "ownerName":{  
            "firstName":"PETE",
            "middleName":"P",
            "lastName":"COLEMAN",
            "generationCode":""
        },
        "ssn":"123456789",
        "currentAddress":{  
            "street":"PO BOX 1064",
            "city":"KOTZEBUE",
            "state":"AK",
            "zip":"99752"
        },
        "driverLicense":null,
        "title":"",
        "dob":null
      }
  ]
})
```

#####  HTML Reports
```js
sbcs.us.reportsBopHtml({
  "subcode":"0517614",
  "comments":"This is a comment field",
  "businessOwners":[  
      {  
        "ownerName":{  
            "firstName":"PETE",
            "middleName":"P",
            "lastName":"COLEMAN",
            "generationCode":""
        },
        "ssn":"123456789",
        "currentAddress":{  
            "street":"PO BOX 1064",
            "city":"KOTZEBUE",
            "state":"AK",
            "zip":"99752"
        },
        "driverLicense":null,
        "title":"",
        "dob":null
      }
  ]
})
```

### Configuring Timeout

Request timeout is configurable (the default is Node's default of 120 seconds):

``` js
experian.setTimeout(20000); // in ms (this is 20 seconds)
```

#### An example `response` object
```js
{
    "requestId": "XXXX-XXXX-XXXX-XXXX",
    "success": true,
    "results": [...]
}
```

#### `error` object
```js
{
    "success": false,
    "requestId": "XXXX-XXXX-XXXX-XXXX",
    "errors": [
        {
            "errorCode": XXXX,
            "errorType": "Error Type",
            "message": "Error Message"
        }
    ]
}
```

## Examples

### Node.js Express Example
We provided an Express based example of using the Experian Node.js API in the `examples/express` folder.

### Vanilla js Example
We provided an Express based example of using the Experian Node.js API in the `examples/vanilla` folder.

## Development

Run all tests:

```bash
$ npm install
$ npm test
```

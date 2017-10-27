# Experian API Node.js Library

The Experian Node library provides convenient access to the REST Experian APIs from applications written in server-side JavaScript.

Please keep in mind that this package is for use with server-side Node that
uses Experian client_id, client_secret, username, password and subcode (if applicable).

## Documentation

Experian API documentation can be @ [Experian](http://developer.experian.com/)

## Installation

Install the package with:

    npm install experian-node --save

## Usage

The package needs to be configured with your account's client_id, client_secret which is available in your [Experan My Apps][api-keys]. Require it with the key's value:

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

[api-keys]: https://developer.experian.com/user/me/apps

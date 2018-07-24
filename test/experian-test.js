'use strict';

require('chai').use(require('chai-as-promised'));
var expect = require('chai').expect;

//sandbox
var EXPERIAN_CLIENT_ID = 'XXXXXXX';
var EXPERIAN_CLIENT_SECRET = 'XXXXXXX';
var EXPERIAN_CLIENT_ID_CONSCREDIT = 'XXXXXXX';
var EXPERIAN_CLIENT_SECRET_CONSCREDIT = 'XXXXXXX';
var VERSION = 'v1';

var Promise = require('bluebird');
var Experian = require('../lib/experian');
var experian = new Experian(
    EXPERIAN_CLIENT_ID,
    EXPERIAN_CLIENT_SECRET,
    VERSION
);

describe('Experian API Module', function() {

    describe('Experian API instance', function() {
        it('should throw an error without client_id and client_secret', function() {
            expect(function() {
                new Experian();
            }).to.throw();
        });
        it('should throw an error without client_secret', function() {
            expect(function() {
                new Experian('XXXX',undefined);
            }).to.throw();
        });
        it('should throw an error without client_id', function() {
            expect(function() {
                new Experian(undefined,'XXXX');
            }).to.throw();
        });
    });

    describe('setApiVersion', function() {
        it('defaults to v1', function() {
            expect(experian.getApiField('version')).to.equal('v1');
        });
        it('can set it to another version', function() {
            experian.setApiVersion('v2');
            expect(experian.getApiField('version')).to.equal('v2');
            experian.setApiVersion('v1'); //Set it back
        });
    });

    describe('setApiKey', function() {
        it('uses Bearer auth', function() {
            expect(experian.getApiField('auth')).to.equal(null);
        });
    });

    describe('setTimeout', function() {
        it('Should define a default equal to the node default', function() {
            expect(experian.getApiField('timeout'))
                .to.equal(require('http').createServer().timeout);
        });
        it('Should allow me to set a custom timeout', function() {
            experian.setTimeout(90000);
            expect(experian.getApiField('timeout')).to.equal(90000);
        });
        it('Should allow me to set null, to reset to the default', function() {
            experian.setTimeout(null);
            expect(experian.getApiField('timeout'))
                .to.equal(require('http').createServer().timeout);
        });
    });

    //Login API
    describe('Login API', function(done) {
        it('Will fail if given a wrong username and password', function() {
            return expect(new Promise(function(resolve, reject) {
                experian.login('someuser@notreal.com','82362466')
                    .then((data) => {
                      },(error) => {
                        reject('ERROR');
                    });
            })).to.be.rejected;
        });
        it('Will throw an error if no username is given', function() {
            expect(function() {
                experian.login(undefined,'82362466');
            }).to.throw();
        });
        it('Will throw an error if no password is given', function() {
            expect(function() {
                experian.login('82362466',undefined);
            }).to.throw();
        });
        it('Will throw an error if username is not a string', function() {
            expect(function() {
                experian.login(24142,'82362466');
            }).to.throw();
        });
        it('Will throw an error if password is not a string', function() {
            expect(function() {
                experian.login('82362466',2524214);
            }).to.throw();
        });
        it('Will return a promise on successfull login', function() {
            return expect(new Promise(function(resolve, reject) {
                experian.login('XXXXXX@XXXXX.com','XXXXXX')
                    .then((data) => {
                        resolve(true);
                    },(error) => {
                        console.error('ERROR');
                        console.error(error);
                        reject(error);
                    });
            })).to.eventually.equal(true);
        });
    });

    //Business Headers API
    describe('Business Information APIs', function() {
        before(function(done) {
            experian = new Experian(
                EXPERIAN_CLIENT_ID,
                EXPERIAN_CLIENT_SECRET,
                VERSION
            );
            experian.setTimeout(90000);
            experian.login('XXXXXX@XXXXX.com', 'XXXXXX')
                .then((data) => {
                    done();
                }, (error) => {
                    // console.error('ERROR');
                    // console.error(error);
                    // reject(error);
                });

        });


        it('Business Search API will give search results', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.search({
                            'name': 'Crocker',
                            'city': 'Phoenix',
                            'state': 'AZ',
                            'subcode': '0517614',
                            'geo': true
                        })
                        .then((data) => {
                            //console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });


        it('Business Headers API will give a business header result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.headers({
                            'bin': '987523317',
                            'subcode': '0517614'
                        })
                        .then((data) => {
                            //console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });


        it('Business Facts API will give a business facts result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.facts({
                            'bin': '700000001',
                            'subcode': '0517614'
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Fraud Shield API will give a business fraud shield result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.fraudShields({
                            'bin': '807205801',
                            'subcode': '0517614'
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Risk Dashboards API will give a business risk dashboard result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.riskDashboards({
                            'bin': '700416430',
                            'subcode': '0517614'
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Bankruptcies API will give a business bankruptcies result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.bankruptcies({
                            'bin': '404197602',
                            'subcode': '0517614',
                            'bankruptcySummary': true,
                            'bankruptcyDetail': true
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Scores API will give a business scores result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.scores({
                            'bin': '987523317',
                            'subcode': '0517614',
                            'commercialScore': true,
                            'fsrScore': false
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Trades API will give a business trades result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.trades({
                            'bin': '987523317',
                            'subcode': '0517614',
                            'tradePaymentSummary': true,
                            'tradePaymentTotals': true,
                            'tradePaymentExperiences': true,
                            'tradePaymentTrends': true
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Credit Status API will give a business credit status result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.creditStatus({
                            'bin': '987523317',
                            'subcode': '0517614'
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Corporate Registration API will give a business corporate registration result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.corporateRegistrations({
                            'bin': '700000001',
                            'subcode': '0517614',
                            'statusDescriptionDetail': true
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Legal Filings and Collections API will give legal filings and collections result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.legalCollectionSummaries({
                            'bin': '796744203',
                            'subcode': '0517614',
                            'legalFilingsCollectionsSummary': true,
                            'legalFilingsSummary': true
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Liens API will give a business liens result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.liens({
                            'bin': '700000001',
                            'subcode': '0517614',
                            'lienSummary': true,
                            'lienDetail': true
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });


        it('Business Judgments API will give a business judgments result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.judgments({
                            'bin': '700000001',
                            'subcode': '0517614',
                            'judgmentSummary': true,
                            'judgmentDetail': true
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });


        it('Business Collections API will give a business collections result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.collections({
                            'bin': '700000001',
                            'subcode': '0517614',
                            'collectionsSummary': true,
                            'collectionsDetail': true
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business UCC Filings API will give a business UCC filings result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.uccFilings({
                            'bin': '700000001',
                            'subcode': '0517614',
                            'uccFilingsSummary': true,
                            'uccFilingsDetail': true
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });


        it('Business Corporate Linkage API will give a business corporate linkage result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.corporateLinkage({
                            'bin': '700000001',
                            'subcode': '0517614',
                            'corporateLinkagePartial': true,
                            'corporateLinkageFull': false
                        })
                        .then((data) => {
                            // console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Contacts API will give a Business Contacts result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.businessContacts({
                            'bin': '716612304',
                            'subcode': '0517614'
                        })
                        .then((data) => {
                            //   console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Reverse Addresses API will give a Business Reverse Addresses result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.reverseAddresses({

                            "subcode": "0517614",
                            "street": "475 ANTON BLVD",
                            "city": "Costa Mesa",
                            "state": "CA",
                            "zip": "92626"
                        })
                        .then((data) => {
                            //   console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('reverseAddresses');
        });

        it('Business Reverse Phones API will give a Business Reverse Phones result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.reversePhones({

                            'subcode': '0517614',
                            "phone": "8008888888"
                        })
                        .then((data) => {
                            //  console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('reversePhones');
        });

        it('Business Reverse TaxIDs API will give a Business Reverse TaxIDs result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.reverseTaxIDs({

                            "subcode": "0517614",
                            "taxId": "222152871"
                        })
                        .then((data) => {
                            //  console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('reverseTaxIds');
        });

        it('Business Scores Search API will give a Business Scores Search result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.scoresSearch({
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
                        .then((data) => {
                            //console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Premier Profiles API will give a Business Premier Profiles result', function() {
            //this.timeout(50000);
            return expect(new Promise(function(resolve, reject) {
                    //setTimeout(done, 30000);
                    //console.log("***************\n"+JSON.stringify(experian));
                    experian.business.us.reportsPremierProfiles({

                            "bin": "706589164",
                            "subcode": "0563736",
                            "modelCode": "000224",
                            "comments": "12345"
                        })
                        .then((data) => {
                            //  console.log(data);
                            //setTimeout(done, 30000)
                            resolve(data);

                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');

            //this.timeout(70000);

        });


        it('Business Premier Profiles HTML API will give a Premier Profiles HTML result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.reportsPremierProfilesHtml({

                            "bin": "706589164",
                            "subcode": "0563736",
                            "modelCode": "000224",
                            "comments": "12345"
                        })
                        .then((data) => {
                            //  console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('Business Aggregates will give a Business Aggregates result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.aggregates({

                            "subcode": "0517614",
                            "bin": "796744203",
                            "extraAggs": true
                        })
                        .then((data) => {
                            //console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });


        it('Business MultiSegments will give a Business MultiSegments result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.business.us.multisegments({

                            "dataPoints": ["bankruptcyDetail", "bankruptcySummary", "collectionsDetail", "collectionsSummary", "businessContacts"],
                            "bin": "700000001",
                            "subcode": "0563736"
                        })
                        .then((data) => {
                            //  console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

    });
    describe('SBCS APIs', function() {
        it('SBCS Headers API will give a sbcs header result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.sbcs.us.headers({
                            'bin': '987523317',
                            'subcode': '0517614'
                        })
                        .then((data) => {
                            //console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('SBCS Aggregates will give a sbcs Aggregates result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.sbcs.us.aggregates({

                            "subcode": "565949",
                            "bin": "796744203",
                            "extraAggs": true
                        })
                        .then((data) => {
                            //console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });

        it('SBCS HTML Report API will give a SBCS HTML Report result', function() {
            return expect(new Promise(function(resolve, reject) {
                    experian.sbcs.us.reportsSbcsHtml({

                            "bin": "702596911",
                            "subcode": "0517635"
                        })
                        .then((data) => {
                            //  console.log(data);
                            resolve(data);
                        }, (error) => {
                            console.error('ERROR');
                            console.error(error);
                            reject(error);
                        });
                }))
                .to.eventually.have.property('results');
        });
    });


});

describe('Consumer Credit Profile API', function() {
    before(function(done) {
        experian = new Experian(
            EXPERIAN_CLIENT_ID_CONSCREDIT,
            EXPERIAN_CLIENT_SECRET_CONSCREDIT,
            VERSION
        );
        experian.setTimeout(90000);
        experian.login('sanket.selokar@experian.com', 'Chankya@161987')
            .then((data) => {
                done();
            }, (error) => {
                console.error('ERROR');
                console.error(error);
                reject(error);
            });
    });

    it('Consumer Credit Profile Credit Report will give a Credit Report result', function() {
        return expect(new Promise(function(resolve, reject) {
                experian.consumerCreditProfile.us.creditReports({
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
                    .then((data) => {
                        //console.log(data);
                        resolve(data);
                    }, (error) => {
                        console.error('ERROR');
                        console.error(error);
                        reject(error);
                    });
            }))
            .to.eventually.have.property('creditProfile');
        //.to.eventually.deep.equal('object');
    });

});
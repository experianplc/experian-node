'use strict';

require('chai').use(require('chai-as-promised'));
var expect = require('chai').expect;

var EXPERIAN_CLIENT_ID = 'XXXXXXX';
var EXPERIAN_CLIENT_SECRET = 'XXXXXXX';
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
      experian.setTimeout(900);
      expect(experian.getApiField('timeout')).to.equal(900);
    });
    it('Should allow me to set null, to reset to the default', function() {
      experian.setTimeout(null);
      expect(experian.getApiField('timeout'))
      .to.equal(require('http').createServer().timeout);
    });
  });

  //Login API
  describe('Login API', function() {
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

    describe('Business Search API', function() {

      it('Will give search results', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.search({
            'name': 'Crocker',
            'city': 'Phoenix',
            'state': 'AZ',
            'subcode': '0563736',
            'geo': true
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Headers API', function() {

      it('Will give a business header result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.headers({
            'bin': '722799117',
            'subcode': '0563736'
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Facts API', function() {

      it('Will give a business facts result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.facts({
            'bin': '700000001',
            'subcode': '0563736'
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });

    });

    describe('Business Fraud Shield API', function() {

      it('Will give a business fraud shield result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.fraudShields({
            'bin': '807205801',
            'subcode': '0563736'
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Risk Dashboards API', function() {

      it('Will give a business risk dashboard result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.riskDashboards({
            'bin': '722799117',
            'subcode': '0563736'
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Bankruptcies API', function() {

      it('Will give a business bankruptcies result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.bankruptcies({
            'bin': '404197602',
            'subcode': '0563736',
            'bankruptcySummary': true,
            'bankruptcyDetail': true
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Scores API', function() {

      it('Will give a business scores result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.scores({
            'bin': '987523317',
            'subcode': '0563736',
            'commercialScore': true,
            'fsrScore': false
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Trades API', function() {

      it('Will give a business trades result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.trades({
            'bin': '987523317',
            'subcode': '0563736',
            'tradePaymentSummary': true,
            'tradePaymentTotals': true,
            'tradePaymentExperiences': true,
            'tradePaymentTrends': true
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Credit Status API', function() {

      it('Will give a business credit status result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.creditStatus({
            'bin': '987523317',
            'subcode': '0563736'
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Corporate Registration API', function() {

      it('Will give a business corporate registration result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.corporateRegistrations({
            'bin': '700000001',
            'subcode': '0563736',
            'statusDescriptionDetail': true
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Legal Filings and Collections API', function() {

      it('Will give legal filings and collections result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.legalCollectionSummaries({
            'bin': '700000001',
            'subcode': '0563736',
            'legalFilingsCollectionsSummary': true,
            'legalFilingsSummary': true
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Liens API', function() {

      it('Will give a business liens result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.liens({
            'bin': '700000001',
            'subcode': '0563736',
            'lienSummary': true,
            'lienDetail': true
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Judgments API', function() {

      it('Will give a business judgments result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.judgments({
            'bin': '700000001',
            'subcode': '0563736',
            'judgmentSummary': true,
            'judgmentDetail': true
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business Collections API', function() {

      it('Will give a business collections result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.collections({
            'bin': '700000001',
            'subcode': '0563736',
            'collectionsSummary': true,
            'collectionsDetail': true
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });

    describe('Business UCC Filings API', function() {

      it('Will give a business UCC filings result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.uccFilings({
            'bin': '700000001',
            'subcode': '0563736',
            'uccFilingsSummary': true,
            'uccFilingsDetail': true
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });

    });

    describe('Business Corporate Linkage API', function() {

      it('Will give a business corporate linkage result', function() {
        return expect(new Promise(function(resolve, reject) {
          experian.business.us.corporateLinkage({
            'bin': '700000001',
            'subcode': '0563736',
            'corporateLinkagePartial': true,
            'corporateLinkageFull': false
          })
          .then((data) => {
            // console.log(data);
            resolve(data);
          },(error) => {
            console.error('ERROR');
            console.error(error);
            reject(error);
          });
        }))
        .to.eventually.have.property('results');
      });
    });
  });
});

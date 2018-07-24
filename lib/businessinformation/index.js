'use strict';

var Promise = require('bluebird'),
    _ = require('lodash'),
    request = require('request'),
    Experian = require('../experian'),
    utils = require('../utils');

var experianInstance;

/**
 * Business API Module Init
 *
 * @param {Experian} instance Experian API Main Module
 */
function init(instance) {
    experianInstance = instance;
}

/**
 * Business Search
 *
 * @param {object} data Search Request Object
 * @returns {Promise} Request as a promise
 */
function search(data) {
    return bisRequest('search', data);
}

/**
 * Business Headers
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function headers(data) {
    return bisRequest('headers', data);
}

/**
 * Business Facts
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function facts(data) {
    return bisRequest('facts', data);
}

/**
 * Business Fraud Shield
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function fraudShields(data) {
    return bisRequest('fraudshields', data);
}

/**
 * Business Risk Dashboard
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function riskDashboards(data) {
    return bisRequest('riskDashboards', data);
}

/**
 * Business Bankruptcies
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function bankruptcies(data) {
    return bisRequest('bankruptcies', data);
}

/**
 * Business Scores
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function scores(data) {
    return bisRequest('scores', data);
}

/**
 * Business Trades
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function trades(data) {
    return bisRequest('trades', data);
}

/**
 * Business Credit Status
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function creditStatus(data) {
    return bisRequest('creditstatus', data);
}

/**
 * Business Corporate Linkage
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function corporateLinkage(data) {
    return bisRequest('corporatelinkage', data);
}

/**
 * Business Legal Collection Summaries
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function legalCollectionSummaries(data) {
    return bisRequest('legalcollectionsummaries', data);
}

/**
 * Business Liens
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function liens(data) {
    return bisRequest('liens', data);
}

/**
 * Business Judgements
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function judgments(data) {
    return bisRequest('judgments', data);
}

/**
 * Business Collections
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function collections(data) {
    return bisRequest('collections', data);
}

/**
 * Business UCC Filings
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function uccFilings(data) {
    return bisRequest('uccfilings', data);
}

/**
 * Business Corporate Registrations
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function corporateRegistrations(data) {
    return bisRequest('corporateregistrations', data);
}

/**
 * Business Business Contacts
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function businessContacts(data) {
    return bisRequest('businesscontacts', data);
}

/**
 * Business Reverse Addresses
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function reverseAddresses(data) {
    return bisRequest('reverseaddresses', data);
}

/**
 * Business Reverse Phones
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function reversePhones(data) {
    return bisRequest('reversephones', data);
}

/**
 * Business Reverse TaxIDs
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function reverseTaxIDs(data) {
    return bisRequest('reversetaxids', data);
}

/**
 * Business Scores Search
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function scoresSearch(data) {
    return bisRequest('scores/search', data);
}

/**
 * Premier Profiles
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function reportsPremierProfiles(data) {
    return bisRequest('reports/premierprofiles', data);
}

/**
 * Premier Profiles HTML
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function reportsPremierProfilesHtml(data) {
    return bisRequest('reports/premierprofiles/html', data);
}

/**
 * Business Aggregates
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function aggregates(data) {
    return bisRequest('aggregates', data);
}

/**
 * Business MultiSegments
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function multisegments(data) {
    return bisRequest('multisegments', data);
}

/**
 * Business API Request
 *
 * @param {string} url Request URL Segment
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function bisRequest(url, data) {
    var accessToken = experianInstance.getApiField('auth');

    if (!accessToken) {
        throw new Error('User not authenticated - use the "login" method before calling an API');
    }

    var basePath = experianInstance.getApiField('basePath');
    var timeout = experianInstance.getApiField('timeout');

    return new Promise(function(resolve, reject) {

        request({
            rejectUnauthorized: false,
            method: 'POST',
            baseUrl: basePath,
            timeout: timeout,
            json: true,
            uri: '/businessinformation/businesses/v1/' + url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: data
        }, function(error, response, body) {

            if (error) {
                return reject(error);
            } else if (response.statusCode === 200) {
                //Checks to see if the 'success' boolean in the response is true
                var success = utils.get(body, 'success', false);
                if (success === true) {
                    //Successful response
                    return resolve(body);
                } else {
                    //Unsucessful response
                    return reject(body);
                }
            } else {
                return reject(body);
            }
        });
    });
}

module.exports = {
    init: init
};

module.exports.us = {
    search: search,
    headers: headers,
    facts: facts,
    fraudShields: fraudShields,
    riskDashboards: riskDashboards,
    bankruptcies: bankruptcies,
    scores: scores,
    trades: trades,
    creditStatus: creditStatus,
    corporateLinkage: corporateLinkage,
    legalCollectionSummaries: legalCollectionSummaries,
    liens: liens,
    judgments: judgments,
    collections: collections,
    uccFilings: uccFilings,
    corporateRegistrations: corporateRegistrations,
    businessContacts: businessContacts,
    reverseAddresses: reverseAddresses,
    reversePhones: reversePhones,
    reverseTaxIDs: reverseTaxIDs,
    scoresSearch: scoresSearch,
    reportsPremierProfiles: reportsPremierProfiles,
    reportsPremierProfilesHtml: reportsPremierProfilesHtml,
    aggregates: aggregates,
    multisegments: multisegments
};
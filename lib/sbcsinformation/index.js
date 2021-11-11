'use strict';

var Promise = require('bluebird'),
    _ = require('lodash'),
    request = require('request'),
    Experian = require('../experian'),
    utils = require('../utils');

var experianInstance;

/**
 * SBCS API Module Init
 *
 * @param {Experian} instance Experian API Main Module
 */
function init(instance) {
    experianInstance = instance;
}

/**
 * SBCS Headers
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function headers(data) {
    return bisRequest('headers', data);
}

/**
 * SBCS Search
 *
 * @param {object} data Search Request Object
 * @returns {Promise} Request as a promise
 */
function search(data) {
    return bisRequest('search', data);
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
 * Premier Profiles HTML
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function reportsSbcsHtml(data) {
    return bisRequest('reports/sbcs/html', data);
}

/**
 * Premier Reports SBCS scores
 *
 * @param {object} data Request Object
 * @returns {Promise} Request as a promise
 */
function reportsSbcsscores(data) {
    return bisRequest('reports/sbcsscores', data);
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
        console.log("Access Token Missing");
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
            uri: '/businessinformation/sbcs/v1/' + url,
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
    aggregates: aggregates,
    reportsSbcsHtml: reportsSbcsHtml,
    reportsSbcsscores: reportsSbcsscores
};
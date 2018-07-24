'use strict';

var Promise = require('bluebird');
var utils = require('./utils');
var request = require('request');

//Sandbox
Experian.DEFAULT_BASE_PATH = 'https://sandbox-us-api.experian.com';
Experian.DEFAULT_API_VERSION = 'v1';

// Use node's default timeout
Experian.DEFAULT_TIMEOUT = require('http').createServer().timeout;

var businessInformation = require('./businessInformation');
var sbcsInformation = require('./sbcsinformation');
var consumerCreditProfileInformation = require('./consumerCreditProfileInformation');

//var consumerCreditProfileInformation = require('./consumerCreditProfileInformation');


/**
 * Create an Experian API instance
 * Get Your App Client ID and Client Secret at:
 * https://developer.experian.com/user/me/apps
 *
 * @param {string} clientId Experian API App Client ID
 * @param {string} clientSecret Experian API App Client Secret
 * @param {string} [version='v1'] Experian API App Client Secret
 * @returns {Experian} Experian API Instance
*/
function Experian(clientId, clientSecret, version) {
  if (!(this instanceof Experian)) {
    return new Experian(clientId,clientSecret,version);
  }

  if (!clientId) {
    throw new Error('No Client ID Provided');
    return;
  }
  if (!clientSecret) {
    throw new Error('No Client Secret Provided');
    return;
  }

  this._api = {
    clientId: clientId,
    clientSecret: clientSecret,
    basePath: Experian.DEFAULT_BASE_PATH,
    version: Experian.DEFAULT_API_VERSION,
    timeout: Experian.DEFAULT_TIMEOUT,
    auth: null
  };

  if (version) {
    this.setApiVersion(version);
  }

  businessInformation.init(this);
  sbcsInformation.init(this);
  consumerCreditProfileInformation.init(this);

  //console.log('Experian Instance Created');

};

Experian.prototype = {

  _setApiField: function(key, value) {
    this._api[key] = value;
  },

  getApiField: function(key) {
    return this._api[key];
  },

  setTimeout: function(timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? Experian.DEFAULT_TIMEOUT : timeout
    );
  },

  setApiVersion: function(version) {
    if (version) {
      this._setApiField('version', version);
    }
  },

  setApiKey: function(key) {
    if (key) {
      this._setApiField(
        'auth',
        'Bearer ' + key
      );
    }
  },
  /**
   * Login to Experian API to authenticate access
   *
   * @param {string} [username] Username of the authorized API user
   * @param {string} [password] Password of the authorized API user
   * @returns {Promise}
  */
  login: function(username, password) {

    if (!username) {
      throw new Error('No Username Provided');
      return;
    }
    if (typeof username != 'string') {
      throw new Error('Username Is Not A String');
      return;
    }
    if (!password) {
      throw new Error('No Password Provided');
      return;
    }
    if (typeof password != 'string') {
      throw new Error('Password Is Not A String');
      return;
    }

    var _self = this;

    return new Promise(function(resolve, reject) {

      request({
        rejectUnauthorized: false,
        method: 'POST',
        baseUrl: _self.getApiField('basePath'),
        json: true,
        uri: '/oauth2/' + _self.getApiField('version') + '/token',
        headers: {
          'client_id': _self.getApiField('clientId'),
          'client_secret': _self.getApiField('clientSecret'),
          'Content-Type': 'application/json',
          'grant_type': 'password'
        },
        body: {
          'username': username,
          'password': password
        }
      }, function(error, response, body) {
        if (error) {
          return reject(error);
        } else if (response.statusCode === 200) {
          var accessToken = utils.get(body, 'access_token', null);
          if (accessToken) {
            _self._setApiField('auth', accessToken);
            return resolve(body);
          } else {
            return reject(body);
          }
        } else {
          return reject(body);
        }
      });

    });

  },

  business: businessInformation,
  sbcs: sbcsInformation,
  consumerCreditProfile: consumerCreditProfileInformation


};

module.exports = Experian;
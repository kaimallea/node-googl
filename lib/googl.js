(function() {
    'use strict';

    var request = require('request'),
        urlParser = require('url').parse,
        Q = require('q'),
        API_ENDPOINT = 'https://www.googleapis.com/urlshortener/v1/url',
        API_KEY = '',
        VERSION = '0.1.2';

    /**
     * Send a request to the goo.gl API
     * @param   {string}  type - can be 'shorten' or 'expand'
     * @param   {string}  url  - url to take action on
     * @returns {promise}
     */
    function _googleRequest(type, url, extraOptions) {
        var deferred = Q.defer(),
            options = {
                uri: API_ENDPOINT,
                qs: {},
                encoding: 'utf8',
                json: true
            };

        if (!API_KEY) {
            deferred.reject(new Error('Google requires an API key. See https://developers.google.com/url-shortener/v1/getting_started#auth'));
            return deferred.promise;
        }

        if (!url || typeof url !== 'string') {
            deferred.reject(new Error('Invalid URL specified'));
            return deferred.promise;
        }

        if (!urlParser(url).protocol) {
            url = 'http://' + url;
        }

        options.qs.key = API_KEY;

        switch(type) {
            case 'shorten':
                options.method = 'POST';
                options.body = { 'longUrl': url };
                break;
            case 'analytics':
            case 'expand':
                options.method = 'GET';
                options.qs.shortUrl = url;
                break;
            default:
                deferred.reject(new Error('Invalid operation'));
                return deferred.promise;
        }

        // For arbitrarily adding userIp, quotaUser, etc.
        // @link https://developers.google.com/console/help/#cappingusage
        if (typeof extraOptions === 'object') {
            for (var opt in extraOptions) {
                if (type === 'shorten') {
                    options.body[opt] = extraOptions[opt];
                } else if (type === 'expand' || type === 'analytics') {
                    options.qs[opt] = extraOptions[opt];
                }
            }
        }

        request(options, function (error, res, body) {
            if (error) {
                deferred.reject(error);
            } else if (res.statusCode !== 200) {
                error = new Error(res.statusCode + ' - ' + body.error.message);
                deferred.reject(error);
            } else {
                deferred.resolve(body);
            }
        });

        return deferred.promise;
    }

    /**
     * Shorten a URL
     * @param   {string}  url
     * @returns {promise}
     */
    function shorten (url, extraOptions) {
        var deferred = Q.defer();

        _googleRequest('shorten', url, extraOptions)
            .then(function (json) {
                deferred.resolve(json.id);
            })
            .catch(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    /**
     * Analytics of a URL
     * @param   {string}  url
     * @returns {promise}
     */
    function analytics (url, extraOptions) {
        var deferred = Q.defer();

        extraOptions = extraOptions || {projection: 'FULL'};

        _googleRequest('analytics', url, extraOptions)
            .then(function (json) {
                deferred.resolve(json.analytics);
            })
            .catch(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }


    /**
     * Expand a URL
     * @param   {string}  url
     * @returns {promise}
     */
    function expand (url, extraOptions) {
        var deferred = Q.defer();

        _googleRequest('expand', url, extraOptions)
            .then(function (json) {
                deferred.resolve(json.longUrl);
            })
            .catch(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    /**
     * Set an API key to use when making requests
     * @param {string}   API key
     * @returns {string} API key
     */
    function setKey (key) {
        if (typeof key === 'string') {
            API_KEY = key;
        }

        return API_KEY;
    }

    /**
     * Get currently set API key
     * @returns {string} API key
     */
    function getKey () {
        return API_KEY;
    }

    module.exports = {
        _googleRequest: _googleRequest,
        shorten: shorten,
        expand: expand,
        analytics: analytics,
        setKey: setKey,
        getKey: getKey,
        VERSION: VERSION
    };
}());

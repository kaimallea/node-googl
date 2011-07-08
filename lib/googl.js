#!/usr/bin/env node

var _url = require('url'),
    _https = require('https'),
    _querystring = require('querystring'),
    args = process.argv.slice(2),
    
    googl = (function () {
        var _apikey = '';
    
    
        function _setKey(key) {
            _apikey = key || '';
            exports.key = _apikey;
        }
    
    
        function _getKey () {
            return (_apikey ? _apikey : '');
        }
    
    
        function _shorten (url, callback) {
            if (!url) { 
                console.error('Please specify a valid url.');
                return; 
            }
        
            if (typeof _url.parse(url).protocol === 'undefined') {
                url = 'http://' + url;
            }
        
            if (!callback) { callback = false; }
        
            var key = _getKey(),
                options = {
                    host: 'www.googleapis.com',
                    port: 443,
                    path: '/urlshortener/v1/url' + (key ? '?' + _querystring.stringify({'key': key}) : ''),
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    }
                };
        
            var req = _https.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (d) {
                    d = JSON.parse(d);
                    if (callback) {
                        callback(d);   
                    } else {
                        console.log(d.id || d.error);
                    }
                });
            });
        
            req.on('error', function(e) { console.error(e); });

            req.write(JSON.stringify({'longUrl': url}));
        
            req.end();
        }
    
    
        function _expand (url, callback) {       
            if (!url) { 
                console.error('Please specify a valid url.');
                return; 
            }

            if (typeof _url.parse(url).protocol === 'undefined') {
                url = 'http://' + url;
            }
        
            if (!callback) { callback = false; }
                    
            var key = _getKey(),
                options = {
                    host: 'www.googleapis.com',
                    path: '/urlshortener/v1/url?' + 
                        (key ? _querystring.stringify({'key': key, 'shortUrl': url}) : 
                            _querystring.stringify({'shortUrl': url}))
                };
        
            _https.get(options, function(res) {
                res.setEncoding('utf8');      
                res.on('data', function (d) {
                    d = JSON.parse(d);
                    if (callback) {
                        callback(d);   
                    } else {
                        console.log(d.longUrl || d.error);
                    }
                });
        
            }).on('error', function(e) {
                console.error(e);
            });        
        }
        
        return {
            'shorten': _shorten,
            'expand': _expand,
            'setKey': _setKey
        };
    }());

exports.shorten = googl.shorten;
exports.expand = googl.expand;
exports.setKey = googl.setKey;

if (args.length) {
    args.forEach(function (val, index, array) {
        if (typeof _url.parse(val).protocol === 'undefined') {
            val = 'http://' + val;
        }
        
        var hostname = (typeof _url.parse(val).hostname === 'undefined' ? '' : 
                        _url.parse(val).hostname);
        
        if (!hostname) {
            console.log('Invalid url: %s', val);
            return;
        }
        
        if (hostname === 'goo.gl') {
            googl.expand(val, function (res) {
                console.log('%s -> %s', val, (res.longUrl || JSON.stringify(res)));  
            });
            return;
        }
        
        googl.shorten(val, function (res) {
            console.log('%s -> %s', val, (res.id || JSON.stringify(res)));  
        });
    });
}
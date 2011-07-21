#!/usr/bin/env node

var googl = require('./lib/googl.js'),
    url = require('url'),
    args = process.argv.slice(2),
    hostname = null;

if (args.length) {
    args.forEach(function (val, index, array) {
        if (typeof url.parse(val).protocol === 'undefined') {
            val = 'http://' + val;
        }
        
        hostname = (typeof url.parse(val).hostname === 'undefined' ? '' : 
                    url.parse(val).hostname);
        
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

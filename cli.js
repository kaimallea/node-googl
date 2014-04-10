#!/usr/bin/env node
(function() {
    'use strict';

    var googl = require('./lib/googl.js'),
        commander = require('commander'),
        urlParser = require('url').parse;

    commander
        .version(googl.VERSION)
        .usage('[options] <url ...>')
        .option('-k, --key <api-key>', 'Specify an API key to use')
        .parse(process.argv);

    if (commander.args.length) {

        if (commander.key) {
            googl.setKey(commander.key);
        }

        commander.args.forEach(function (url, index, array) {

            if (!urlParser(url).protocol) {
                url = 'http://' + url;
            }

            if ('goo.gl' === urlParser(url).hostname) {

                googl.expand(url)
                    .then(function (longUrl) {
                        console.log('%s -> %s', url, longUrl);
                    })
                    .catch(function (err) {
                        console.error(err.message);
                    });

            } else {

                googl.shorten(url)
                    .then(function (shortUrl) {
                        console.log('%s -> %s', url, shortUrl);
                    })
                    .catch(function (err) {
                        console.error(err.message);
                    });

            }
        });
    }

}());

[![Build Status](https://travis-ci.org/kaimallea/node-googl.svg?branch=master)](https://travis-ci.org/kaimallea/node-googl) [![NPM version](https://badge.fury.io/js/goo.gl.svg)](http://badge.fury.io/js/goo.gl)

## Installation

    npm install -g goo.gl

## Command-line Usage

```bash
$ goo.gl www.google.com
http://www.google.com -> http://goo.gl/fbsS

$ goo.gl http://goo.gl/fbsS
http://goo.gl/fbsS -> http://www.google.com/

$ goo.gl www.google.com http://goo.gl/fbsS nba.com
http://goo.gl/fbsS -> http://www.google.com/
http://www.google.com -> http://goo.gl/fbsS
http://nba.com -> http://goo.gl/d1T8

$ goo.gl --key aBcDeFGhIjKLMnOPqRsT www.spotify.com
http://www.spotify.com/ -> http://goo.gl/cJFAL
```

It'll shorten and/or expand one or more URLs at a time.

## Module Usage

Most methods return promises.

```javascript
var googl = require('goo.gl');

// Set a developer key (_required by Google_; see http://goo.gl/4DvFk for more info.)
googl.setKey('aBcDeFGhIjKLMnOPqRsT');

// Get currently set developer key
googl.getKey();

// Shorten a long url and output the result
googl.shorten('http://www.google.com/')
    .then(function (shortUrl) {
        console.log(shortUrl);
    })
    .catch(function (err) {
        console.error(err.message);
    });

// Expand a goo.gl url and output the result
googl.expand('http://goo.gl/fbsS')
    .then(function (longUrl) {
        console.log(longUrl);
    })
    .catch(function (err) {
        console.error(err.message);
    });

// Expand a goo.gl url and pass userIp for capping purposes
googl.expand('http://goo.gl/fbsS', { userIp: '127.0.0.1' })
    .then(function (longUrl) {
        console.log(longUrl);
    })
    .catch(function (err) {
        console.error(err.message);
    });

// Shorten a goo.gl url and pass quotaUser for capping purposes
// See: https://developers.google.com/console/help/#cappingusage
googl.shorten('www.spotify.com', { quotaUser: 'UserID' })
    .then(function (shortUrl) {
        console.log(shortUrl);
    })
    .catch(function (err) {
        console.error(err.message);
    });

// Look up a short URL's analytics
// See: https://developers.google.com/url-shortener/v1/getting_started#url_analytics
googl.analytics('http://goo.gl/fbsS', {projection: 'ANALYTICS_CLICKS'})
    .then(function(result) {        
        console.log(result);
    })
    .catch(function (err) {
        console.error(err.message);
    });

googl.analytics('http://goo.gl/fbsS', {projection: 'FULL'})
    .then(function(result) {        
        console.log(result);
    })
    .catch(function (err) {
        console.error(err.message);
    });

googl.analytics('http://goo.gl/fbsS', {projection: 'ANALYTICS_TOP_STRINGS'})
    .then(function(result) {        
        console.log(result);
    })
    .catch(function (err) {
        console.error(err.message);
    });

//default to projection=FULL
googl.analytics('http://goo.gl/fbsS')
    .then(function(result) {        
        console.log(result);
    })
    .catch(function (err) {
        console.error(err.message);
    });

```

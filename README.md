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

Methods return promises.

```javascript
var googl = require('goo.gl');

// Shorten a long url and output the result
googl.shorten('http://www.google.com/')
    .then(function (shortUrl) {
        console.log(shortUrl);
    })
    .catch(function (err) {
        console.error(err.message);
    });


// Set a developer key (see http://goo.gl/4DvFk for more info.)
googl.setKey('aBcDeFGhIjKLMnOPqRsT');

// Get currently set developer key
googl.getKey();

// Expand a goo.gl url and output the result
googl.expand('http://goo.gl/fbsS')
    .then(function (longUrl) {
        console.log(shortUrl);
    })
    .catch(function (err) {
        console.error(err.message);
    });
});
```

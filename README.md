## Installation

    npm install -g goo.gl

## Command-line Usage

    goo.gl www.google.com
    goo.gl http://goo.gl/fbsS
    goo.gl www.google.com http://goo.gl/fbsS nba.com

It'll automatically shorten or expand single or multiple urls

## Module Usage

```javascript
var googl = require('goo.gl');

// Shorten a long url and output the result
googl.shorten('http://www.google.com/', function (shortUrl) {
    console.log(shortUrl);
});


// Set a developer key (see http://goo.gl/4DvFk for more info.)
googl.setKey('aBcDeFGhIjKLMnOPqRsT');


// Expand a goo.gl url and output the result
googl.expand('http://goo.gl/fbsS', function (longUrl) {
    console.log(shortUrl);
});
```
## Installation

    npm install googl

## Usage

    var googl = require('googl');
    
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
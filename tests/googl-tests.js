var googl = require('../lib/googl.js'),
    assert = require('assert');

googl.shorten('http://www.google.com/', function (result) {
    assert.equal(result.id, 'http://goo.gl/fbsS');
});

googl.expand('http://goo.gl/fbsS', function (result) {
    assert.equal(result.longUrl, 'http://www.google.com/');
});

googl.setKey('ABCDEFGabcdefg01234567');
assert.equal(googl.key, 'ABCDEFGabcdefg01234567');
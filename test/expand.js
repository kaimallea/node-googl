(function() {
    'use strict';

    var googl = require('../lib/googl.js'),
        chai = require('chai'),
        chaiAsPromised = require('chai-as-promised'),
        expect = chai.expect;

    chai.use(chaiAsPromised);

    describe('#expand()', function() {
        beforeEach(function() {
            googl.setKey('test');
        });

        xit('should expand a goo.gl url', function(done) {
            var url = 'http://goo.gl/cJFAL',
                urlExpanded = 'http://www.spotify.com/';

            expect(googl.expand(url))
                .to.eventually.equal(urlExpanded)
                .and.notify(done);
        });

        xit('should not expand a url with an invalid key', function(done) {
            var url = 'http://goo.gl/cJFAL',
                errMsg = '400 - Bad Request';

            googl.setKey('nope');

            expect(googl.expand(url))
                .to.be.rejectedWith(errMsg)
                .and.notify(done);
        });

        xit('should expand a goo.gl url without a protocol', function(done) {
            var url = 'http://goo.gl/cJFAL',
                urlExpanded = 'http://www.spotify.com/';

            expect(googl.expand(url))
                .to.eventually.equal(urlExpanded)
                .and.notify(done);
        });

        xit('should fail on non goo.gl urls', function(done) {
            var url = 'http://bit.ly/hello',
                errMsg = '400 - Invalid Value';

            expect(googl._googleRequest('expand', url))
                .to.be.rejectedWith(errMsg)
                .and.notify(done);
        });
    });
}());

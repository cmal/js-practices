var assert = require('assert');
var should = require('chai').should()

describe('base64', function() {
  var base64 = require('../base64.js').base64;
  describe('#base64()', function() {
    it ('base64 should convert empty string to empty string', function() {
      base64('').should.equal('');
    });
    it ('base64 should convert "ABC" to "QUJD"', function() {
      base64('ABC').should.equal('QUJD');
    });
    it ('base64 should convert "AB" to "QUIK"', function() {
      base64('AB').should.equal('QUI=');
    });
  });
});

describe('lrucache', function() {
  var LRUCache = require('../lrucache.js').LRUCache;
  const cache = new LRUCache(2);
  describe('LRUCache', function() {
    it ('has should work', function() {
      cache.has('a').should.equal(false);
      cache.miss('a', 1);
      cache.has('a').should.equal(true);
    });
    it ('hit should work', function() {
      cache.hit('a');
      cache.lookup('a').should.equal(1);
    });
    it ('miss should work', function() {
      cache.miss('b', 2);
      cache.lookup('b').should.equal(2);
    });
    it ('lookup should work', function() {
      cache.lookup('a').should.equal(1);
      cache.lookup('b').should.equal(2);
    });
    it ('evict should work', function() {
      cache.evict('a');
      cache.has('a').should.equal(false);
      cache.has('b').should.equal(true);
    });
    it ('lru should work fine', function() {
      if (!cache.has('a')) cache.miss('a', 1);
      if (!cache.has('b')) cache.miss('b', 1);
      if (cache.has('a')) cache.hit('a');
      if (!cache.has('c')) cache.miss('c', 3);
      cache.has('a').should.equal(true);
      cache.has('b').should.equal(false);
      cache.has('c').should.equal(true);
    });
  })
});

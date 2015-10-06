var assert = require("assert");
var text = require("../modules/text").text;

describe('text', function() {
  describe('#parse()', function () {
    it('add dash to text', function () {
      assert.equal(text.parse("x"), "x-");
    });
  });
});

var assert = require("assert");
var text = require("../modules/text");

describe('text', function() {
  describe('#columnify()', function () {

    it('should fix spaces 1', function () {
      assert.equal(text.columnify("let x = 3"), "let x = 3");
      assert.equal(text.columnify("let x  = 3"), "let x = 3");
    });

    it('should fix lines', function () {
      assert.equal(text.columnify("let x = 3;\nlet ab = 4;"), "let x  = 3;\nlet ab = 4;");
    });

    it('should preserve initial indentation', function () {
      assert.equal(text.columnify("  let x = 3;\nlet ab = 4;"), "  let x  = 3;\nlet   ab = 4;");
    });

    it('handle empty lines', function () {
      assert.equal(text.columnify("x = 3;\n\nab = 4;"), "x  = 3;\n\nab = 4;");
    });

    it('not pad ending of line', function () {
      assert.equal(text.columnify("x = 3;\nab = 45;"), "x  = 3;\nab = 45;");
    });

    it('handle empty line at end', function () {
      assert.equal(text.columnify("x = 3;\n"), "x = 3;\n");
    });

    it('single line should remove unnecessary space', function () {
      assert.equal(text.columnify("x  = 3;"), "x = 3;");
    });
  });

  describe('#decolumnify()', function () {
    it('remove any column alignment', function () {
      assert.equal(text.decolumnify("let x     = 3;\nlet ab     = 4;"), "let x = 3;\nlet ab = 4;");
    });
  });
});

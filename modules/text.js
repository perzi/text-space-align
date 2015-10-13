module.exports = {

  // TODO: create this depending on language
  reg: /(?:^\s+){0,1}\S*(?:"[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*"|'[^'\\\r\n]*(?:\\.[^'\\\r\n]*)*'|\/\*.*?\*\/|\/\/.*$|\S+)\S*/g,

  parse: function(s) {
    return s.match(this.reg);
  },

  columnify: function(s) {
    var lines = s.split("\n");
    var tokenizedLines = lines.map(function(line) {
      return this.parse(line);
    }, this);

    // calculate max lengths
    var maxLengths = [];
    tokenizedLines.forEach(function(tokenizedLine) {

      if (!tokenizedLine) {
        return;
      }

      var lengths = tokenizedLine.map(function(token) {
        return token.length;
      });

      lengths.forEach(function(length, index) {
        if (maxLengths[index] === undefined || maxLengths[index] < length) {
          maxLengths[index] = length;
        }
      });
    }, this);

    // pad tokens
    var result = tokenizedLines.map(function(tokenizedLine) {

      if (!tokenizedLine) {
        return "";
      }

      var paddedTokens = tokenizedLine.map(function(token, index, arr) {
        if (index < arr.length - 1) {
          var pad = maxLengths[index] - token.length + 1;
          return token + (new Array(pad)).join(" ");
        } else {
          return token;
        }
      });

      return paddedTokens.join(" ");
    });

    var output = result.join("\n");

    return output;
  },

  decolumnify: function(s) {
    var lines = s.split("\n");

    var result = lines.map(function(line) {
      return this.columnify(line);
    }, this);

    var output = result.join("\n");
    return output;
  }
}

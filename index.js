var text = require("./modules/text");

module.exports.columnify = function(s) {
  return text.columnify(s);
}

module.exports.decolumnify = function(s) {
  return text.decolumnify(s);
}

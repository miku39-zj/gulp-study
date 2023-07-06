const writeContents = require("./write-content");

function dest(outFolder) {
  return writeContents(outFolder);
}

module.exports = dest;

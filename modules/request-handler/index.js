const QueryParser = require("../query-parser");

class RequestHandler {
  constructor(query) {
    this.queryParser = new QueryParser(query.term);
  }
  async getQueryParser() {
    return this.queryParser;
  }
}

module.exports = RequestHandler;

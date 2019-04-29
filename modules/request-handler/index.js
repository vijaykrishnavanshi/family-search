const QueryParser = require("../query-parser");

class RequestHandler {
  constructor(query) {
    this.queryParser = new QueryParser(query.term);
  }
  async getQueryParser() {
    return this.queryParser;
  }
  async getParsedQuery() {
    return this.queryParser.getParsedQuery();
  }
}

module.exports = RequestHandler;

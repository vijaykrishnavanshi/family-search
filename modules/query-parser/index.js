class QueryParser {
  constructor(query) {
    this.query = query;
    this.parsedQuery = (query || "").split(" ");
  }
  async getQuery() {
    return this.query;
  }

  async getParsedQuery() {
    return this.parsedQuery;
  }
}

module.exports = QueryParser;

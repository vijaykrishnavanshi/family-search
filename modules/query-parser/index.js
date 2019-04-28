class QueryParser {
  constructor(query) {
    this.query = query;
  }
  async getQuery() {
    return this.query;
  }
}

module.exports = QueryParser;

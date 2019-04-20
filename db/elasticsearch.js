const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace",
  requestTimeout: 60000
});
module.exports = client;

const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "$$$12345")
);

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function() {
  // Close the driver when application exits.
  // This closes all used network connections.
  driver.close();
});

module.exports = driver;

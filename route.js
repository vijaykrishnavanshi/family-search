"use strict";
const express = require("express");
const router = express.Router();
const elasticsearch = require("./db/elasticsearch");
const neo4j = require("./db/neo4j");

router.route("/search-elasticsearch").get((req, res) => {
  console.log(req.query);
  elasticsearch
    .search({
      index: "nameindex",
      q: (req.query && req.query.term) || "geller"
    })
    .then(response => {
      console.log(response.hits.hits);
      return res.json({ hello: response.hits.hits });
    })
    .catch(error => {
      console.trace(error.message);
      return res.json({ hello: false });
    });
});

router.route("/search-neo4j").get((req, res) => {
  console.log(req.query);
  const session = neo4j.session();
  const cypherQuery = "MATCH (u:User {email: {email}}) RETURN u";
  const params = {
    email: "alice@example.com"
  };
  session
    .run(cypherQuery, params)
    .then(results => {
      const result = results[0];
      if (!result) {
        console.log("No user found.");
        res.json({ hello: null });
      } else {
        const user = result["u"];
        console.log(JSON.stringify(user, null, 4));
        res.json({ hello: JSON.stringify(user, null, 4) });
      }
    })
    .catch(error => {
      throw error;
    });
});

router.route("/search").get((req, res) => {
  console.log("req.query: ", req.query);
  elasticsearch
    .search({
      index: "nameindex",
      q: (req.query && req.query.term) || "geller"
    })
    .then(response => {
      console.log("response: ", response);
      console.log("response.hits.hits: ", response.hits.hits);
      console.log(response.hits.hits);
      const { hits } = response.hits;
      const firstHit = hits.shift();
      const { id } = firstHit._source;
      const session = neo4j.session();
      const cypherQuery = `MATCH (cast:CAST {id: {id}}) RETURN cast`;
      const params = { id };
      console.log(cypherQuery);
      return session.run(cypherQuery, params);
    })
    .then(results => {
      console.log(results);
      results.records.map(record => console.log(record.get("cast")));
      const record = results.records.shift();
      if (!record) {
        console.log("No user found.");
        res.json({ hello: null });
      } else {
        const castNode = record.get("cast");
        console.log(JSON.stringify(castNode, null, 4));
        res.json({ hello: castNode.properties });
      }
    })
    .catch(error => {
      console.trace(error.message);
      return res.json({ hello: false });
    });
});

module.exports = router;

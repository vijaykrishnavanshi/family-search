"use strict";
const express = require("express");
const router = express.Router();
const elasticsearch = require('./db/elasticsearch');
const neo4j = require('./db/neo4j');

router.route("/search").get(
  (req, res) => {
    console.log(req.query);
    elasticsearch.search({
        q: 'pants'
    }).then(response => {
        console.log(response.hits.hits);
        return res.json({ hello: response.hits.hits });
    }).catch(error => {
        console.trace(error.message)
        return res.json({ hello: false });
    });
  }
);

router.route("/search-neo4j").get(
    (req, res) => {
      console.log(req.query);
      neo4j.cypher({
        query: 'MATCH (u:User {email: {email}}) RETURN u',
        params: {
            email: 'alice@example.com',
        },
    }, function (err, results) {
        if (err) throw err;
        const result = results[0];
        if (!result) {
            console.log('No user found.');
            res.json({ hello: null });
        } else {
            const user = result['u'];
            console.log(JSON.stringify(user, null, 4));
            res.json({ hello: JSON.stringify(user, null, 4) });

        }
    });
    }
);

module.exports = router;

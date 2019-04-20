const neo4j = require("../db/neo4j");
const elasticsearch = require("../db/elasticsearch");
const friends = require("./friends");

const session = neo4j.session();
function createNode() {
  console.log(friends);
  const cast_nodes = friends["CAST_NODE"];
  const queries = cast_nodes.map(cast_node => {
    return `
        MERGE(
            cast${cast_node.id}:CAST {
                id: ${cast_node.id},
                first_name: "${cast_node.first_name}",
                last_name: "${cast_node.last_name}",
                gender: "${cast_node.gender}",
                age: "${cast_node.age}"
            }
        )
    `;
  });
  console.log(queries);
  const queryToExecute = `${queries.join("\n")} return 0`;
  const resultPromise = session.run(queryToExecute);
  resultPromise
    .then(result => {
      console.log(result);
      //   elasticsearch.indices.create({
      //     index: "nameindex",
      //     body: {
      //       mappings: {
      //         properties: {
      //           id: {
      //             type: "keyword"
      //           },
      //           first_name: {
      //             type: "text"
      //           },
      //           last_name: {
      //             type: "text"
      //           }
      //         }
      //       }
      //     }
      //   });
      console.log(cast_nodes[0]);
      elasticsearch.index({
        index: "nameindex",
        type: "document",
        id: cast_nodes[0].id,
        body: {
          first_name: cast_nodes[0].first_name,
          last_name: cast_nodes[0].last_name,
          id: cast_nodes[0].id
        }
      });
    })
    .then(result => {
      console.log(result);
    });
}

createNode();

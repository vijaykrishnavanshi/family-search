const neo4j = require("../db/neo4j");
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
  resultPromise.then(result => {
    console.log(result);
  });
}

createNode();

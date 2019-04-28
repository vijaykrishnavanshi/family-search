const neo4j = require("../db/neo4j");
const elasticsearch = require("../db/elasticsearch");
const friends = require("./friends");

const session = neo4j.session();
async function createNode() {
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
  const result = await session.run(queryToExecute);
  console.log(result);

  // create index
  // eslint-disable-next-line
  const indexExists = await elasticsearch.indices.exists({
    index: "nameindex"
  });
  if (indexExists) {
    await elasticsearch.indices.delete({
      index: "nameindex"
    });
  }
  await elasticsearch.indices.create({
    index: "nameindex",
    body: {
      mappings: {
        properties: {
          id: {
            type: "keyword"
          },
          first_name: {
            type: "text"
          },
          last_name: {
            type: "text"
          }
        }
      }
    }
  });
  const indexingPromises = cast_nodes.map(cast_node => {
    return elasticsearch.index({
      index: "nameindex",
      type: "_doc",
      id: cast_node.id,
      body: {
        first_name: cast_node.first_name,
        last_name: cast_node.last_name,
        id: cast_node.id
      }
    });
  });
  await Promise.all(indexingPromises);
}

createNode().catch(console.log);

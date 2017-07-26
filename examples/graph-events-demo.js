// example without browser
// use `node graph-events-demo.js` to test

const {GraphEvent, Graph} = require('../lib/index.js')

const nodes = [
  { id : 1, label : "Node A", type : "node" },
  { id : 2, label : "Node B", type : "node" },
  { id : 3, label : "Node C", type : "node" }
]

const edges = [
  { source : 1, target : 2, label : "Edge A -> B", type : "edge" },
  { source : 2, target : 3, label : "Edge B -> C", type : "edge" }
]

// create nodes and edges
const eventCreateNodes = new GraphEvent({
  action : "create",
  data : nodes
})
const eventCreateEdges = new GraphEvent({
  action : "create",
  data : edges
})

// make some changes
const eventUpdateNodeA = new GraphEvent({
  action : "delete",
  selector : { id : 1, type : "node" }
})

const graphInit = new Graph([eventCreateNodes, eventCreateEdges ])
console.log( graphInit.nodes().length + " nodes" )

const graphFinal = new Graph([eventCreateNodes, eventCreateEdges, eventUpdateNodeA])
console.log( graphFinal.nodes().length + " nodes" )

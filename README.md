# Graph Events

[![Build Status](https://travis-ci.org/clemsos/graph-events.svg?branch=master)](https://travis-ci.org/clemsos/graph-events)

**Graph Events** is a storage system to create and manipulate states of networks and graphs based on the evolution of their properties over time.


## How it Works

* All modifications are stored using **commits**, so you can easily maintain a clean state of you graphs and do / undo / moderate changes.
* Everything is serializable in **JSON**, so all data can be stored in databases, plain files or just plain arrays.

```js
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

/*
* Results in the console :
*
* $ node graph-events-demo.js       
*   3 nodes
*   2 nodes
*
*/
```

See the [examples folder](./examples) to see it in use.


### Commands

| Command | Description | Options |
|------|------|------|
| `create` | create new node(s) | Object data |
| `update` | update elements with new properties | Object selector, Object data |
| `delete` | delete nodes | Object selector |

### Publish

    npm run prepublish
    npm publish


### Test

    gulp test

### Docs

    gulp doc

then navigate to the `/docs` folder to see the documentation.

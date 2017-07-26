# Graph Event

    Ongoing work - not ready to use yet

**Graph Event** is a storage system to create and manipulate states of networks and graphs based on the evolution of their properties over time.


## How it Works

* All modifications are stored using **commits**, so you can easily maintain a clean state of you graphs and do / undo / moderate changes.
* Everything is serializable in **JSON**, so all data can be stored in databases, plain files or just plain arrays.

### Example

```js

import { GraphEvent, Graph } from 'topo-events'

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
const eventCreateNodes = new GraphEvent("create", "nodes", nodes)
const eventCreateEdges = new GraphEvent("create", "edges", nodes)

// make some changes
const eventUpdateNodeA = new GraphEvent({ type : "node",  id : 1, "label" : "Renamed node A" })


const graphInit = Graph([eventCreateNodes, eventCreateEdges ])
const graphFinal = Graph([...graphInit, eventUpdateNodeA])

console.log( GraphEvent.nodes() )

/*
[
  { id : 1, label : "Renamed node A", type : "node" },
  { id : 2, label : "Node B", type : "node" },
  { id : 3, label : "Node C", type : "node" }
]
*/


```

### Commands

| Command | Description | Options |
|------|------|------|
| `create` | create new node(s) | Array properties |
| `update` | update elements with new properties | Object selector, Array properties |
| `delete` | delete nodes | Object selector|


### Test

    gulp test

### Docs

    gulp doc

then navigate to the `/docs` folder to see the documentation.

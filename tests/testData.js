// some test data
export const nodes = [
  { id : 1, label : "Node A", type : "node" },
  { id : 2, label : "Node B", type : "node" },
  { id : 3, label : "Node C", type : "node" }
]

export const edges = [
  { source : 1, target : 2, label : "Edge A -> B", type : "edge" },
  { source : 2, target : 3, label : "Edge B -> C", type : "edge" }
]

export const instruction = {
  action : "create",
  data : nodes
}

export const instructions = [
  {
    action : "create",
    data : nodes
  },
  {
    action : "create",
    data : edges
  },
  {
    action : "update",
    selector : { id : 1, type : "node" },
    data : { "label" : "Renamed node A" }
  }
]

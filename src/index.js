import Graph from './js/Graph.js'
import GraphEvent from './js/GraphEvent.js'

// export for browser
if(typeof window !== 'undefined') window.Graph = Graph
if(typeof window !== 'undefined') window.GraphEvent = GraphEvent

module.exports.GraphEvent = GraphEvent
module.exports.Graph = Graph

import { assert }  from 'chai'
import moment from 'moment'

import { nodes, edges, instruction, instructions }  from './testData.js'
import Graph  from '../src/js/Graph.js'
import GraphEvent  from '../src/js/GraphEvent.js'

describe('Graph', () => {

  describe('init', () => {
    it('does not accept empty params', () =>{
      assert.throws(function() {
          new Graph()
      }, Error)
    })

    it('does not accept wrong params', () =>{
      assert.throws(function() {
          new Graph({})
      }, Error)
    })

    it('does not accept not valid events', () =>{
      assert.throws(function() {
          new Graph([{}, {}])
      }, Error)
    })
  })

  describe('parseGraph', ()=> {
    it('does add nodes properly', ()=> {
      let events = [instruction].map(d => new GraphEvent(d))
      let g = new Graph(events)
      assert.equal(g.nodes().length, nodes.length)
    })

    it('does add edges properly', ()=> {
      let events = [instructions[1]].map(d => new GraphEvent(d))
      let g = new Graph(events)
      assert.equal(g.edges().length, edges.length)
    })

    it('does update nodes properly', ()=> {
      let events = instructions.map(d => new GraphEvent(d))
      let g = new Graph(events)
      assert.equal(g.nodes().length, nodes.length)
      assert.equal(g.edges().length, edges.length)
      assert.equal(g.nodes()[0].label, "Renamed node A")
    })

    it('does update edges properly', ()=> {
      instructions.push({
        action : 'update',
        selector : {type : 'edge', target : 1, source : 2},
        data : { label : 'Youpi!' }
      })

      let events = instructions.map(d => new GraphEvent(d))

      let g = new Graph(events)
      assert.equal(g.nodes().length, nodes.length)
      assert.equal(g.edges().length, edges.length)
      assert.equal(g.edges()[0].label, "Youpi!")
    })

    it('does delete nodes properly', ()=> {
      instructions.push({
        action : 'delete',
        selector : { type : 'node', id : 3 }
      })

      let events = instructions.map(d => new GraphEvent(d))

      let g = new Graph(events)
      assert.equal( g.nodes().length, nodes.length-1)
    })

    it('does delete edges properly', ()=> {
      instructions.push({
        action : 'delete',
        selector : { type : 'edge', source : 1, target : 2  }
      })

      let events = instructions.map(d => new GraphEvent(d))
      let g = new Graph(events)
      assert.equal( g.edges().length, edges.length-1)
    })


    it('does delete multiple elements properly', ()=> {
      instructions.push({
        action : 'delete',
        selector : { type : 'node' }
      })

      let events = instructions.map(d => new GraphEvent(d))
      let g = new Graph(events)
      assert.equal( g.nodes().length, 0)

    })



  })
})

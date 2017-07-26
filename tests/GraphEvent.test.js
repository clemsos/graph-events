import { assert }  from 'chai'
import GraphEvent  from '../src/js/GraphEvent.js'
import moment from 'moment'

// some test data
const nodes = [
  { id : 1, label : "Node A", type : "node" },
  { id : 2, label : "Node B", type : "node" },
  { id : 3, label : "Node C", type : "node" }
]

const edges = [
  { source : 1, target : 2, label : "Edge A -> B", type : "edge" },
  { source : 2, target : 3, label : "Edge B -> C", type : "edge" }
]

let instruction = {
  action : "create",
  data : nodes
}

let instructions = [
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

describe('GraphEvent', () => {

  describe('init', () => {
    it('does not accept empty params', () =>{
      assert.throws(function() {
          new GraphEvent()
      }, Error)
    })

    it('does not accept an empty Array', () =>{
      assert.throws(function() {
          new GraphEvent([])
      }, Error)
    })

    it('does not accept weird objects', () =>{
      assert.throws(function() {
          new GraphEvent({ 'bla' : 'loves'})
      }, Error)
    })

    it('does accept a single instruction', () =>{
      new GraphEvent(instruction)
    })

    it('does not accept an array of instructions', () =>{
      assert.throws(function() {
          new GraphEvent(instructions)
      }, Error)
    })
  })

  describe('storage', () => {

    it('has a unique ID', () => {
      let commitA = new GraphEvent(instruction)
      let commitB = new GraphEvent(instruction)
      assert.equal(typeof(commitA.id), 'string')
      assert.isAtLeast(commitA.id.length, 20)
      assert.notEqual(commitA.id, commitB.id)
    })

    it('stores a date Object when created', () =>{
      let commitA = new GraphEvent(instruction)
      assert.isTrue(moment(commitA.ts).isValid())
    })

    it('export/import JSON correctly', () => {
      let commitA = new GraphEvent(instruction)
      let j = commitA.toJSON()
      let commitB = new GraphEvent(j)
      assert.equal(commitA.id, commitB.id)
      assert.deepEqual(commitA.diff, commitB.diff)
      assert.isTrue(moment(commitA.ts).isValid())
      assert.isTrue(moment(commitB.ts).isValid())
    })

  })
  //
  // describe('features', () =>{
  //
  //   it('should store creation of nodes', () =>{
  //     let c = new GraphEvent(instruction)
  //     assert.equal(c.diff.add.length, 1)
  //   })
  //
  //   it('should store creation of nodes', () =>{
  //     let c = new GraphEvent(instructions)
  //     assert.equal(c.diff.add.length, 6)
  //   })
  //
  //   describe("LINK", () => {
  //     it('should add both source and target nodes', () =>{
  //       const instruction = new TopoQuery('Joe loves Jack')
  //       let c = new GraphEvent(instruction)
  //       console.log(c);
  //       // assert.equal(c.diff.add.length, 3)
  //       // console.log(c.diff)
  //     })
  //   })
  //
  // })

  // it('should work with a bunch of queries', () => {
  //   let c = new GraphEvent( queries.map(q => new TopoQuery(q)) )
  // })
})

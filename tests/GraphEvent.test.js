import { assert }  from 'chai'
import moment from 'moment'

import { instruction, instructions }  from './testData.js'
import GraphEvent  from '../src/js/GraphEvent.js'

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

    it('does accept all kind of instructions', () =>{
      instructions.forEach(instruction => new GraphEvent(instruction))
    })

    it('does not accept an array of instructions', () =>{
      assert.throws(function() {
          new GraphEvent([])
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

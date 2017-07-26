import crypto from 'crypto'
import equal  from 'deep-equal'

/**
 *
 * The GraphEvent class is will store a instruction that can be applied to a graph
 * Each commit has a unique ID.
 * Each commit is serializable, to make it easy to be stored and create undo/redo.
 *
 * @name GraphEvent
 * @kind class
 * @param {Object} instruction An instruction
 * @param {String} instruction  A JSON-stringified GraphEvent object
 * @example var commit = new GraphEvent(...)
 */
class GraphEvent {

  constructor(rawInstruction) {

    // parse string from raw JSON
    if (typeof(rawInstruction) == 'string' ) {
      let { id, instruction, ts }= this.fromJSON(rawInstruction)
      this.id = id
      this.instruction = instruction
      this.ts = ts
    }
    else {
      this.id = crypto.randomBytes(20).toString('hex')
      this.instruction = rawInstruction
      this.ts = (new Date()).getTime()
    }

    if ( ! this.isValidQuery(this.instruction) ) {
      throw new Error('Instruction is not valid')
    }
  }

  /**
  * Check if object is a valid query object
  * @name isValidQuery
  * @param {Object} a selector object
  * @return {Boolean} validty
  */
  isValidQuery(instruction) {

    // check type
    if(!["create", "update", "delete"].includes(instruction.action))
      return false

    // check keys
    let validKeys = ['action', 'data']
    if (instruction.action === "update" || instruction.action === "delete" )
      validKeys.push('selector')

    return (
      instruction instanceof Object
      &&
      equal( Object.keys(instruction), validKeys)
    )
  }

  toJSON() {
    return JSON.stringify({ id : this.id, instruction : this.instruction, ts : this.ts })
  }

  fromJSON(json) {
    return JSON.parse(json)
  }
}

export default GraphEvent

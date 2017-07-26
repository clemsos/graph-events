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
      let now  = new Date()
      this.ts = now.getTime()
    }

    this.isValidEvent(this.instruction)

  }

  /**
  * Check if the instructions passed are valid
  * @name isValidEvent
  * @param {Object} instruction an instruction object
  * @return {Boolean} validty
  */
  isValidEvent(instruction) {

    if (!instruction instanceof Object) {
      throw new Error(`Wrong event object type :${typeof instruction}`)
    }

    // check type
    if(!["create", "update", "delete"].includes(instruction.action)) {
      throw new Error(`Wrong event action :${instruction.action}`)
    }

    // check keys
    let validKeys = ['action'];
    if (instruction.action === "update" || instruction.action === "delete" )
      validKeys.push('selector')
    if (instruction.action === "create" || instruction.action === "update")
      validKeys.push('data')

    if (!equal( Object.keys(instruction).sort(), validKeys.sort())) {
      throw new Error(`Wrong instruction data :${Object.keys(instruction)}. Excepted : ${validKeys}`)
    }

    return true
  }

  toJSON() {
    return JSON.stringify({ id : this.id, instruction : this.instruction, ts : this.ts })
  }

  fromJSON(json) {
    return JSON.parse(json)
  }
}

export default GraphEvent

import equal  from 'deep-equal'

/**
 *
 * The Graph class receives GraphEvents objects and turn into a proper network
 *
 * @name Graph
 * @kind class
 * @param {Array} events An array of GraphEvent objects
 * @example var g = new GraphEvent([...GraphEvent, GraphEvent])
 */
class Graph {

  constructor(graphEvents) {
    if (! graphEvents instanceof Array)
      throw new Error('Graph Events should be an array.')

    graphEvents.forEach( (event, i) => {
      // check events validity
      if(!this.isValidEvent(event))
        throw new Error(`Graph Event ${i} is not valid.`)
    })

    this.events = graphEvents;

    // init
    this.elements = []

    // make a network
    this.parseEvents(graphEvents)
  }

  parseEvents(graphEvents) {
    graphEvents
      // .sort((a,b) => b.ts -a.ts ) // sort by timestamp
      .forEach( event =>  {
        this.parseEvent(event.instruction)
      })
  }


  parseEvent(instruction) {
    if(instruction.action === "create") this.addElements(instruction.data)
    else if(instruction.action === "update")
      this.updateElements(instruction.selector, instruction.data)
    else if(instruction.action === "delete")
      this.deleteElements(instruction.selector)
    else throw Error(`Action ${instruction.action} not implement yet`)
  }


  addElements(els) {
    els.forEach(el => this.elements.push(el))
  }

  updateElements(selector, data) {

    // make sure selector is an object
    if(! typeof selector === 'object' ) {
      throw Error(`Selector ${typeof selector}:${selector} should be an Object`)
    }

    // copy for immutability
    let elements = JSON.parse(JSON.stringify(this.elements));

    //reassigned without selected nodes
    let els = elements
      .map(el => {
        Object.keys(selector)
          .forEach(k =>
            el[k] === selector[k] ? // if any value correspond to the filter
              Object.assign(el, data) // apply this value
              :
              el
          )
        return el
      })

    this.elements = els


  }

  deleteElements(selector) {

    // make sure selector is valid
    if(! typeof selector === 'object' ) {
      throw Error(`Selector ${typeof selector}:${selector} should be an Object`)
    }

    // copy for immutability
    let elements = JSON.parse(JSON.stringify(this.elements));

    // filter out selected nodes
    let els = elements
      .filter( el =>
        !equal(
          Object.keys(selector)
            .filter(k => el[k] === selector[k])
            ,
          Object.keys(selector)
        )
      )
    this.elements = els
  }

  // getter functions
  nodes() {
    return this.elements.filter( el => el.type === 'node')
  }

  edges() {
    return this.elements.filter( el => el.type === 'edge')
  }


  /**
  * Check if an event is valid
  * @name isValidEvent
  * @param {Object} event a GraphEvent object
  * @return {Boolean} validty
  */
  isValidEvent(event) {

    if(! typeof(event) === "object" || !Object.keys(event).length ) {
      throw new Error(`Graph Event timestamp is empty or not valid.`)
    }

    if(! typeof(event.ts) === "number") {
      throw new Error(`Graph Event timestamp ${typeof event.ts}:${event.ts} is not valid.`)
    }

    if(! typeof(event.id) === "string"){
      throw new Error(`Graph Event id ${event.id} is not valid.`)
    }

    if(! typeof(event.instruction) === "object"){
      throw new Error(`Graph Event instructions ${event.instruction} is not valid.`)
    }

    return true
  }

}

export default Graph

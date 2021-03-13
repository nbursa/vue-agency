export class CaslItemBase {
  constructor(item, ...args) {
    // args[0] will be holding model name
    // args[1] will be holding custom options object

    // Assign all properties of o to future class instances
    Object.keys(item).map(key => {
      this[key] = item[key]
    })

    // Keep reference to a class being instantiated
    // IMPORTANT This WILL be used by CASL for instance type check!!!
    this.constructor.modelName = args[0]

    // Friendly log
    // console.log(
    //   `In CaslItemBase => ${this.constructor.name} class modelName: `,
    //   this.constructor.modelName
    // )
    // Keep model name as well on instance, for easier debugging!
    // this does not affect CASL in any way, it's just for us
    this.__MODEL = args[0]
  }
}

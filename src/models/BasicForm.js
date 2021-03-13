export class BasicForm {
  constructor(data) {
    for (let field in data) {
      this[field] = data[field] // assign to instance properties
    }
  }

  reset() {}
}

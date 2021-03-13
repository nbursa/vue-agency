class FormErrors {
  constructor() {
    this.errors = {}
  }
  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }
  record({ errors, message }) {
    if (errors) {
      this.errors = errors
    }
    if (message) {
      this.message = message
    }
  }

  clear(field) {
    if (field) {
      delete this.errors[field]
      return
    }
    this.errors = {}
  }
  any() {
    return Object.keys(this.errors).length
  }
}

export default FormErrors

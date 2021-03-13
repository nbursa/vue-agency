export default class InputTypeValidation {
  static validate(e, type) {
    let regExFilter = {
      number: /[^0-9]/g,
      text: /[^a-zA-Z ]/g,
      tel: /[^0-9+-]/g
    }
    e.target.value = e.target.value.replace(regExFilter[type], "")
    return e.target.value
  }
}
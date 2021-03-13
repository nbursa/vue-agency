import {
  isEmpty
} from "lodash"

/**
 * Takes form object and array of key names to check if they are empty
 *
 * @param {Object} formItem ( Form item object to iterate against )
 * @param {Array} toCheck ( Array of property keys to check with)
 */

const itemValidation = ({
  formItem,
  toCheck
}, el) => {

  let result = Object.keys(formItem).filter(param => {
    return toCheck.includes(param) && isEmpty(formItem[param])
  }).length !== 0
  if (result) {
    el.classList.add('validatorDisabled')
  } else {
    el.classList.remove('validatorDisabled')
  }
}

const formValidator = {
  bind(el, binding) {
    if (el) {
      itemValidation(binding.value, el)
    }
  },
  componentUpdated(el, binding) {
    if (el) {
      itemValidation(binding.value, el)
    }
  }
}

export default formValidator
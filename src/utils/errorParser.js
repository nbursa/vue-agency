import { jsonify } from "@/utils/presentational"

export const errorParser = ({ errors }) => {
  if (errors && errors.length) {
    return jsonify(Object.values(errors))
  }
  return "errors: []"
}
/*
 * Take first error of each type
 */
export const parseValidationMessages = errors => {
  return errors.map(error => {
    return Array.isArray(error) ? `<p>${error[0]}</p>` : `<p>${error}</p>`
  })
}

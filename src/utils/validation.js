/*
 * Helper that checks if passed value is between specified ranges
 * @param obj {
 *  min: Number,
 *  max: Number,
 *  val: Number
 * }
 */
export const rangeChecker = ({ min, max, val }) => {
  // console.log("min", min + "\n", "max", max + "\n", "val", val + "\n")
  return (val - min) * (val - max) < 0
}

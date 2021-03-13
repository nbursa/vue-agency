import { pipe } from "@/utils/functional"

/*
 * Get resulting drag width of bound element
 */
export const getDimension = obj => ({
  [obj.dimension]: obj.container.getBoundingClientRect()[obj.dimension],
  ...obj
})

export const parcel = obj =>
  parseInt(Math.round(obj.width * (obj.parcel / 100)))

export const deriveWidth = pipe(getDimension, parcel)

/*
 * Trigger callback on reaching max width condition
 */

export const widthControl = function(
  { drawerWidth, parentWidth, parcelWidth },
  callback
) {
  if (typeof callback !== "function")
    throw new Error("callback is not a function")
  if (Math.round(drawerWidth / parentWidth * 100) >= parcelWidth) {
    callback({ drawerWidth, parentWidth, parcelWidth })
  }
}

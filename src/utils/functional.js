/* eslint no-unused-vars: "off" */

/*
 * @desc
 * General function helpers, that will be used across app
 */

/* Will be used as a reducer function in a pipe() below */
const _pipe = (f, g) => (...args) => g(f(...args))

/*
 * Piping function, for function composition
 * @params fns Functions that will be piped
 * @return Fn Composed function that accepts any number of arguments
 */
export const pipe = (...fns) => fns.reduce(_pipe)

import ClassFactory from "@/models/Casl/ClassFactory"
import { capitalise } from "@/utils/general"

export const caslDecorate = f => (...args) => {
  console.log("...args provided: ", args)
  console.warn("...running collection getter")

  let value = f.apply(this)

  return value && typeof value.then === "function"
    ? value.then(collection => {
        console.warn(`async ...( ${f.name || "Anonymous"} ) ended in decorator`)
        return collection.map(item => {
          return new ClassFactory(capitalise(args[0]), item, ...args)
        })
      })
    : value.map(item => {
        console.warn(`...( ${f.name || "Anonymous"} ) ended in decorator`)
        return new ClassFactory(capitalise(args[0]), item, ...args)
      })
  // console.log("Decorated objects: ", collection)
}

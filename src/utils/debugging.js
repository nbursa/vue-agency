/* eslint-disable no-console */
export const log = new Proxy(
  {},
  {
    get: (x, k) => (...pass) => {
      let last = [...pass].pop()

      if (last instanceof Object && last.groupAs) {
        console.group(last.groupAs)
        pass.pop()
      }

      let underline
      const colors = k.split("On")
      let [color, onColor] = colors

      /* Starts with _, means write underlined */
      if (color.charAt(0) === "_") {
        underline = true
        color = color.slice(1)
      }

      console.log(
        `%c★ ${pass.join("\n★ ")}`,
        `color: ${color}; background-color: ${onColor ? onColor : "white"}
        ; font-size: 14px
        ; border-bottom: ${underline ? "1px" : "0"} dashed black
        ; padding: 0 .3em`
      )

      if (last instanceof Object && last.groupAs) {
        console.groupEnd(last.groupAs)
      }
    }
  }
)

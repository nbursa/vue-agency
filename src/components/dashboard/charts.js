import Chart from "chart.js"

export function generateChart(chartId, chartType) {
  return {
    render: function (createElement) {
      return createElement(
        "div", {
          style: this.styles,
          class: this.cssClasses
        },
        [
          createElement("canvas", {
            attrs: {
              id: this.chartId,
              width: this.width,
              height: this.height
            },
            ref: "canvas"
          })
        ]
      )
    },

    props: {
      chartId: {
        default: chartId,
        type: String
      },
      width: {
        default: 400,
        type: Number
      },
      height: {
        default: 300,
        type: Number
      },
      cssClasses: {
        type: String,
        default: ""
      },
      styles: {
        type: Object
      },
      plugins: {
        type: Array,
        default () {
          return []
        }
      }
    },

    data() {
      return {
        _chart: null,
        _plugins: this.plugins
      }
    },

    methods: {
      addPlugin(plugin) {
        this.$data._plugins.push(plugin)
      },
      renderChart(data, options) {
        this.$data._chart = new Chart(this.$refs.canvas.getContext("2d"), {
          type: chartType,
          data: data,
          options: options,
          plugins: this.$data._plugins
        })
      }
    },
    beforeDestroy() {
      if (this.$data._chart) {
        this.$data._chart.destroy()
      }
    }
  }
}

export const Doughnut = generateChart("doughnut-chart", "doughnut")
export const Line = generateChart("line-chart", "line")

export default {
  Doughnut,
  Line
}
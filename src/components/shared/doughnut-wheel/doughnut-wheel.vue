<template lang="pug">
  div.job-wheel.cut-tool(:class="toolCursor")
    canvas.job-wheel__canvas(id="wheel" :width="size.width" :height="size.height" ref="canvas")
    .job-wheel__slice(:style="sliceSize")
</template>

<script>
import DoughnutChart from './doughnut-chart'
import ChartDefaults from './config-default'

export default {
  props: {
    config: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    timedata: {
      type: Array,
      required: true
    },
    activetool: {
      type: String,
      required: false,
      default: 'move'
    },
    size: {
      type: Object,
      required: false,
      default: () => {
        return {
          width: 360,
          height: 360
        }
      }
    }
  },
  data() {
    return {
      editable: this.config,
      DoughnutChart: null
    }
  },
  computed: {
    sliceSize() {
      return {
        width: `${Math.floor(this.size.width / 2.2)}px`,
        height: `${Math.floor(this.size.height / 2.2)}px`
      }
    },
    toolCursor() {
      return `${this.activetool}-tool`
    }
  },
  watch: {
    timedata: {
      handler: function() {
        this.DoughnutChart.updateCanvas(this.timedata)
      },
      deep: true
    },
    activetool: {
      handler: function() {
        this.DoughnutChart.changeTool(this.activetool)
      }
    }
  },
  mounted() {
    this.initChart()
    this.$on('doughnut-wheel:update', data => {
      this.$emit('timestate:update', data)
    })
  },
  methods: {
    initChart() {
      const ChartConfig = Object.assign(ChartDefaults.config, this.config)
      this.DoughnutChart = new DoughnutChart(
        ChartConfig,
        this.$refs.canvas,
        this.timedata,
        this.activetool,
        this
      )
      this.DoughnutChart.initCanvas()
    }
  }
}
</script>

<style lang="stylus" scoped>
.job-wheel {
  touch-action: none;
  min-width: 360px;
  position: relative;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;

  &__canvas {
    margin: 0 auto;
    display: block;
  }

  &__slice {
    background: #fff;
    border-radius: 50%;
    position: absolute;
    pointer-events: none;
    width: 200px;
    height: 200px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.cut-tool {
  cursor: auto;
  cursor: url('~@/assets/static/agency-setup/job-times/pointer-cut.svg') 2 2, pointer;
}

.merge-tool {
  cursor: auto;
  cursor: url('~@/assets/static/agency-setup/job-times/pointer-merge.svg') 2 2, pointer;
}

.move-tool {
  cursor: auto;
  cursor: url('~@/assets/static/agency-setup/job-times/pointer-move.svg') 2 2, pointer;
}
</style>

<script>
import { Doughnut, mixins } from "vue-chartjs"
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(
      this.chartData,
      {
        responsive: false,
        maintainAspectRatio: false,
        cutoutPercentage: 60,
        legend: { display: false },
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        tooltips: {
          displayColors: false
        }
      }
    )
  }
}
</script>
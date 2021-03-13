<template lang="pug">
  div
    base-button(@click="getReport('Csv')") {{$t('reporting.button_csv')}}    
    .is-hidden
      a(href="" target="_blank" ref="fileOpener")
    base-button(@click="" style="margin-left: 10px") {{$t('scheduler.btt_notification')}}
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import { DateTime } from "luxon"


export default {
  props: {
    dateRange: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      columns: [
        "payroll_id",
        "job_times",
        "temp_attributes",
        "note",
        "job_type"
      ]
    }
  },
  computed: {
    ...mapGetters("reports/table", ["getColumns"]),
  },
  methods: {
    ...mapActions("reports", ["generateReport"]),

    getReport(type) {

      const { start, end } = this.dateRange
      const dateFrom = DateTime.fromISO(start).toFormat("yyyy-LL-dd")
      const dateTo = DateTime.fromISO(end).toFormat("yyyy-LL-dd")

      const columns = this.getColumns.filter(column => column.hasOwnProperty('id')).map(column => {
        return this.columns[column.id - 1]
      })
      let columnsUrl = ''
      columns.forEach(column => columnsUrl += `,${column}`)

      const filters = Object.assign({}, {dateFrom, dateTo}, { fileType: type })
      const reportUrl = "/reports/internal-hours-worked"
      const typeOption = {
        genFileType: type === 'pdf' ? "application/pdf" : "octet/stream"
      }
      const extensionType = type.replace('M', '').toLowerCase()

      this.generateReport({ filters, typeOption, reportUrl, columnsUrl }).then(file => {
        console.log(file.fileUrl)
        this.$refs.fileOpener.href = file.fileUrl
        this.$refs.fileOpener.download = `${this.$t(`reporting.reportFileName.workUtilization`)}.${extensionType}`
        this.$refs.fileOpener.click()
        file.revoke()
      })
    },
  }
}
</script>
<style lang="stylus">
.is-hidden
  display none
</style>
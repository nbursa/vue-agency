<template lang="pug">
.availability-cal
  v-job-calendar(
    @cell-selected="fetchByDay(...arguments, $event)"
    @calendar-ready="fetchJobsByRange(...arguments)"
    @date-changed="fetchJobsByRange(...arguments)"
    :jobs="jobs",
    :cellModule="statusCellModule"
  )
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import VJobCalendar from '@/components/jobs/job-calendar/VJobCalendar.vue'
import VJobCalendarCellStatuses from '@/components/jobs/job-calendar/cellModules/VJobCalendarCellStatuses'
import { DateTime, Info } from 'luxon'

export default {
  components: {
    VJobCalendar
  },
  props: {
    candidate: {
      type: Object,
      required: true,
      default: null
    },
    candidateId: {
      type: Number,
      required: true,
      default: null
    }
  },
  data() {
    return {
      statusCellModule: VJobCalendarCellStatuses
    }
  },
  computed: {
    ...mapState('candidateDetails/jobHistory/calendar', ['jobs'])
  },
  mounted() {
    this.clearCellData()
  },
  methods: {
    ...mapActions('candidateDetails/jobHistory/calendar', [
      'fetchJobs',
      'clearCellData'
    ]),
    ...mapActions('userUnavailiability', ['getUserRequests']),
    ...mapActions('modals', ['toggleModal', 'setModalComponent']),
    openAssignJobModal(cellData) {
      this.setModalComponent({
        modalComponent: 'assignJob',
        modalData: cellData
      })
    },
    fetchJobsByRange: async function ({ range }) {
      let r
      if (range) {
        const { start, end } = range

        const dateFrom = DateTime.fromISO(start).toFormat('yyyy-LL-dd')
        const dateTo = DateTime.fromISO(end).toFormat('yyyy-LL-dd')
        r = {
          dateFrom,
          dateTo
        }
      }

      await this.fetchJobs({
        range: { ...r, user_id: this.candidateId }
      })

      await this.getUserRequests({
        id: this.candidateId,
        type: 'all',
        include: 'dates',
        ...r
      })
    },
    async fetchByDay({ item, meta, payload, cb }, rng) {
      if (payload.render || item.diffNow('days').days > -1) return false
      this.openAssignJobModal({
        cellPayload: payload,
        cellData: item,
        candidateData: this.candidate
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.availability-cal
  padding 2rem
  &__controls
    margin-bottom 2rem
    margin-top -1rem
</style>

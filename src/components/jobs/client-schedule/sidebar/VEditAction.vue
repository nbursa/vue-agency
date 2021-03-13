<template lang="pug">
div.client-schedule-edit
  header
    .sidebar-control
      p
        router-link(:to="{path: '/submit-job'}")
          base-button(v-tooltip.bottom-start="$t('tooltips.job_submit.add_job')") {{$t("jobs_sidebar.submit")}}

  section.sidebar-overflow
    div(v-for="job in formItem")
      v-schedule-job-form(
        :job="job"
        :schedulerInterval="interval"
        @job-form:edit-candidate="openModal"
        @job-form:update-job="updateJob"
      )

</template>

<script>
import { mapState, mapActions } from "vuex"
import VScheduleJobForm from "./VScheduleJobForm"

export default {
  components: {
    VScheduleJobForm
  },
  computed: {
    ...mapState("clientSchedule/scheduler", ["selected", "interval"]),
    ...mapState("clientSchedule/edit", [
      "formItem",
      "itemSaved",
      "isFetching",
      "itemDeleted"
    ]),
  },
  watch: {
    selected: {
      handler: "getJobs",
      deep: true
    }
  },
  mounted() {
    this.getJobs()
  },
  methods: {
    ...mapActions("clientSchedule", ["getClientJobs"]),
    ...mapActions("clientSchedule/modal", ["setModalComponent"] ),
    openModal(payload) {
      this.setModalComponent({modalComponent:  "addCandidate" , modalData: payload})
    },
    getJobs() {
      //TODO make do without sideeffect 
      this.$parent.$parent.$emit("toggle")
      
      let id = this.selected.header.clientId
      let date = this.selected.payload.date
      this.getClientJobs({id, date})

    },
    updateJob() {

    },
    updateField() {
      console.log('test')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar'

.client-schedule-edit
  section
    padding 85px 20px 0px 20px
</style>

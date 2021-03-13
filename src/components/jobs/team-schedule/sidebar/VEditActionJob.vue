<template lang="pug">
div.team-schedule-edit
  header
    .sidebar-control
      p
        router-link(:to="{path: '/submit-job'}")
          base-button(v-tooltip.bottom-start="$t('tooltips.job_submit.add_job')") {{$t("jobs_sidebar.submit")}}
    p.team-schedule-edit__header-date
      | {{headerDate}}


  section.sidebar-overflow
    v-schedule-job-form(
      v-if="selected.cellInfo.type === 'job'"
      :scheduledJob="formItem"
      @job-form:cancel-job="cancel"
    )
</template>

<script>

import { mapState, mapActions} from "vuex"
import { DateTime } from "luxon"
import ScheduledJob from "@/models/ScheduledJob.js"
import VScheduleJobForm from "./VScheduleJobForm.vue"
import { errorDefaults, successDefaults } from "@/config/notifications"


export default {
  components: {
    VScheduleJobForm
  },
  computed: {
    ...mapState("teamSchedule/scheduler", ["selected"]),
    ...mapState("teamSchedule/editJob", [
      "formItem",
      "itemSaved",
      "isFetching",
      "itemDeleted",
      "errors"
    ]),
    headerDate() {
      return DateTime.fromSQL(this.selected.cellInfo.date).toFormat("DDDD")
    },
  },
  watch: {
    selected: {
      handler: "setJobModel",
      deep: true
    },
    errors: function(errors) {
      console.log(errors)
      if (Object.keys(errors).length !== 0) {
        const e = this.$merge(errorDefaults, {
          group: "foo",
          text: errors.error
        })
        this.$notify(e)
      }
    },
  },
  created() {
    this.setJobModel()
  },
  methods: {
    ...mapActions("teamSchedule", ["getMemberJob", "cancelJob"]),
    ...mapActions("teamSchedule/editJob", [
      "updateItemField",
      "clearErrors",
      "setFormItem",
    ]),
    setJobModel() {
      //TODO make do without sideeffect 
      this.$parent.$parent.$emit("toggle")
      this.setFormItem(Object.assign({}, new ScheduledJob()))
      this.getMemberJob(this.selected.payload.id)
    },
    cancel(job) {
      this.cancelJob(job).then(() => {
        const e = this.$merge(successDefaults, {
          group: "foo",
          text: "Job canceled!"
        })
        this.$notify(e)
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/styles/global/partials/right-sidebar'

.team-schedule-edit
  section
    padding 0 20px 0px 20px

  &__header-date
    border-top 1px solid #dfe2e3
    padding 15px
    text-align center
    color #202123
    font-size 1em
    font-weight bold
    line-height 1.375em
</style>

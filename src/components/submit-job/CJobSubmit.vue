<template lang="pug">
  div
    .section
      .columns
        .column.job-submit-content-box
          .panel
            .panel-heading
              div.column.is-10 {{$t("jobs_submit.panel_head")}}
              div.m-left-auto
                v-experience-switcher(
                  :onSubmitAction="() =>$router.push({ path: '/submit-job' })"
                  :footerText="$t('global.experience_switcher_footer_old')"
                  :submitText="$t('global.experience_switcher_submit_old')"
                )
            .panel-block
              .columns
                div.column.is-4.is-paddingless.panel--overflow.job-left-panel.has-border
                  v-job-options(
                    v-bind="{agencies, clients, jobTypes, attributes: getAttributesWithChildren, grades, job, bonuses}"
                  )
                div.column.is-4.panel--overflow.job-mid-panel
                  v-job-datepicker
                div.column.is-4.panel--overflow
                  .default-placeholder(v-if="generatedJobs.length === 0")
                    svgicon.svg-image.default-action(name="global/default-action-image" :original="true")
                    h2.is-size-4.has-text-weight-bold {{$t("jobs_submit.column_head")}}
                    p {{$t("jobs_submit.column_text")}}
                  ul.job-list(:class="{'is-linked': job.requestType === 2}")
                    transition-group(name="base-slide-out")
                      li(v-for="(jobTab, index) in generatedJobs" :key="index")
                        v-job-tab(
                          :job="jobTab"
                          :index="index"
                        )
            .panel-footer.is-clearfix
              v-job-submit-control

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import VJobTab from './VJobTab'
import VJobSubmitControl from './VJobSubmitControl'
import VJobDatepicker from './VJobDatepicker'
import VJobOptions from './VJobOptions'

import CMainContainer from '@/components/shared/triptih/CMainContainer.vue'
import VExperienceSwitcher from '@/components/shared/experience-switcher/VEperienceSwitcher'

export default {
  components: {
    VJobTab,
    VJobSubmitControl,
    VJobOptions,
    VJobDatepicker,
    CMainContainer,
    VExperienceSwitcher
  },
  computed: {
    ...mapState({
      sidebarComponent(state) {
        return state['jobSubmission'].sidebar.sidebarComponent
      }
    }),
    ...mapState('jobSubmission', ['job', 'meta', 'status', 'generatedJobs']),
    ...mapState('agencies', ['agencies']),
    ...mapState('jobTypes', ['jobTypes']),
    ...mapState('attributes', ['attributes']),
    ...mapState('clients', ['clients']),
    ...mapState('grades', ['grades']),
    ...mapState('bonuses', ['bonuses']),
    ...mapGetters('attributes', [
      'getAttributeValues',
      'getAttributesWithChildren'
    ]),
    ...mapGetters('jobSubmission', ['getValidJob'])
  },
  watch: {
    job: {
      handler: function () {
        if (this.getValidJob) {
          this.setJobTabs()
        } else if (
          this.generatedJobs.length !== 0 &&
          this.job.selectedDates.length === 0
        ) {
          //clear generated jobs when no date selected
          this.resetGeneratedJobs()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.setJobTabs()
    this.getAgencies()
    this.getJobTypesWithChildren()
    this.getClientsWithChildren()
    this.getAttributes()
    this.getGrades()
    this.getAllBonuses({ responseType: 'all' })
  },
  methods: {
    ...mapActions('jobSubmission/sidebar', ['setSidebarComponent']),
    ...mapActions('agencies', ['getAgencies']),
    ...mapActions('jobTypes', ['getJobTypesWithChildren']),
    ...mapActions('attributes', ['getAttributes']),
    ...mapActions('clients', ['getClientsWithChildren']),
    ...mapActions('jobSubmission', ['setJobTabs', 'resetGeneratedJobs']),
    ...mapActions('grades', ['getGrades']),
    ...mapActions('bonuses', ['getAllBonuses'])
  }
}
</script>
<style lang="stylus" scoped>

@import '~@/assets/styles/global/variables';
@import '~@/assets/styles/global/components/JobSubmitPanels';

.panel-heading {
  display: flex;
}
.m-left-auto {
  margin-left: auto
}
</style>

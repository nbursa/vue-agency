<template lang="pug">
  .canidate-details
    VCandidateInfo(:candidate="candidate")

    v-tabs(ref="candidateProfileTabs" :sparseClick="true")
      v-tab(:name="$t('candidate_details.candidate_info_tab1_title')")
        v-on-boarding-setup-content-box(
          :controls="{}"
        )
         VOverviewTab
      v-tab(:name="$t('candidate_details.candidate_info_tab2_title')")
        v-on-boarding-setup-content-box(
          :controls="{}"
        )
          VJobHistoryTab
      v-tab(:name="$t('candidate_details.candidate_info_tab3_title')")
        v-on-boarding-setup-content-box(
          :controls="{}"
        )
          VDocumentsTab(:candidateId="candidateId")
      v-tab(:name="$t('candidate_details.candidate_info_tab4_title')")
        v-on-boarding-setup-content-box(
          :controls="{}"
        )
          VCalendarTab(:candidate="candidate" :candidateId="candidateId" v-if="extremePlaceholder")

    v-assign-job(
      v-if="showAssignJob"
    )

</template>

<script>
import VCandidateInfo from './VCandidateInfo'
import VOverviewTab from './VOverviewTab'
import VJobHistoryTab from './VJobHistoryTab'
import VDocumentsTab from './VDocumentsTab'
import VCalendarTab from './VCalendarTab'
import VAssignJob from '@/components/shared/modals/assign-job/VAssignJobModal'

import VTabs from '@/components/on-boarding-setup/VTabs'
import VTab from '@/components/on-boarding-setup/VTab'
import VOnBoardingSetupContentBox from '@/components/on-boarding-setup/VOnBoardingSetupContentBox'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    VCandidateInfo,
    VOverviewTab,
    VTabs,
    VTab,
    VOnBoardingSetupContentBox,
    VJobHistoryTab,
    VDocumentsTab,
    VCalendarTab,
    VAssignJob
  },
  computed: {
    ...mapGetters('modals', ['modalComponent', 'modalData']),
    ...mapState({
      candidate(state, getters) {
        return state.candidateDetails.candidate.edit.formItem
      }
    }),
    candidateId() {
      return Number(this.$route.params.candidateId)
    },
    showAssignJob() {
      return this.modalComponent === 'assignJob'
    }
  },
  data() {
    return {
      extremePlaceholder: true
    }
  },
  watch: {
    candidateId: {
      handler: function (newValue, oldValue) {
        this.getCandidate(newValue)
      }
    }
  },
  created() {
    this.getCandidate(this.candidateId)
  },
  methods: {
    ...mapActions('candidateDetails/candidate', ['getCandidate'])
  }
}
</script>

<style lang="stylus" scoped>
.canidate-details {
  max-width: 800px;
  margin: 20px auto;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
</style>

<style lang="scss">
.canidate-details {
  .tabs {
    margin-bottom: 12px;
  }
  .section,
  .column {
    padding: 0 !important;
  }
  .panel-block--overflow {
    height: auto !important;
  }
}
</style>

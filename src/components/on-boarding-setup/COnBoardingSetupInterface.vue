<template lang="pug">
div
  notifications(group="boardstep", position="top center", :class="'custom-center-position'" )

  v-tabs(ref="boardTabs" :sparseClick="tabNavigation")
    v-tab(:name="$t('agency_structure.tab_0')")
      v-on-boarding-setup-content-box(
        :controls="agencySetupControls"
      )
        p(slot="description")
          | {{ $t("agency_structure.tab_description_0") }}
        CAgency(
          :errors="formErrors"
        )

    v-tab(:name="$t('agency_structure.tab_1')")
      v-on-boarding-setup-content-box(
        :controls="controls"
      )
        p(slot="description")
          | {{ $t("agency_structure.tab_description_1") }}
        CSectorsInterface
    v-tab(:name="$t('agency_structure.tab_2')")
      v-on-boarding-setup-content-box(
        :controls="controlsJobTimes"
        :isLoading="isLoading"
      )
        p(slot="description")
          | {{ $t("agency_structure.tab_description_2") }}
        v-job-times

    v-tab(:name="$t('agency_structure.tab_3')")
      v-on-boarding-setup-content-box(
        :controls="controlsJobTypes"
      )
        p(slot="description")
          | {{ $t("agency_structure.tab_description_3") }}
        v-job-types(ref="jobTypes")
    v-tab(:name="$t('agency_structure.tab_4')")
      v-on-boarding-setup-content-box(
        :controls="controls"
      )
        p(slot="description")
          | {{ $t("agency_structure.tab_description_4") }}
        c-areas-interface
    v-tab(:name="$t('agency_structure.tab_5')")
      v-on-boarding-setup-content-box(
        :controls="controls"
      )
        p(slot="description")
          | {{ $t("agency_structure.tab_description_5") }}
        c-grades-interface
    v-tab(:name="$t('agency_structure.tab_6')")
      v-on-boarding-setup-content-box(
        :controls="controls"
      )
        p(slot="description")
          | {{ $t("agency_structure.tab_description_6") }}
        c-attributes
    v-tab(:name="$t('agency_structure.tab_7')")
      v-on-boarding-setup-content-box(
        :controls="controls"
      )
        p(slot="description")
          | {{ $t("agency_structure.tab_description_7") }}
        c-roles-interface(ref="roles")
    v-tab(:name="$t('agency_structure.tab_8')")
      v-on-boarding-setup-content-box(
        :controls="controls"
      )
        p(slot="description")
          | {{ $t("agency_structure.tab_description_8") }}
        c-taxes-interface(ref="taxes")
    v-tab(:name="$t('agency_structure.tab_9')")
      v-on-boarding-setup-content-box(
        :controls="controlsLast"
      )
        p(slot="description")
          | {{ $t("agency_structure.tab_description_9") }}
        c-holidays-interface(ref="holidays")


</template>

<script>
import VTabs from './VTabs'
import VTab from './VTab'
import VOnBoardingSetupContentBox from './VOnBoardingSetupContentBox'
import { readServerMessages } from '@/mixins/validationMixin'
import { errorDefaults, successDefaults } from '@/config/notifications'
import { mapActions, mapGetters, mapState } from 'vuex'
import { FooterControl } from '@/factories'
import { formErrors } from '@/mixins/formErrorsMixin'

import {
  CAgency,
  CSectorsInterface,
  VJobTypes,
  VJobTimes,
  CGradesInterface,
  CAttributes,
  CAreasInterface,
  CRolesInterface,
  CTaxesInterface,
  CHolidaysInterface
} from './steps'

export default {
  components: {
    VTabs,
    VTab,
    CAgency,
    VOnBoardingSetupContentBox,
    VJobTypes,
    VJobTimes,
    CSectorsInterface,
    CGradesInterface,
    CAreasInterface,
    CAttributes,
    CRolesInterface,
    CTaxesInterface,
    CHolidaysInterface
  },
  mixins: [readServerMessages, formErrors],
  provide() {
    const localError = {}
    Object.defineProperty(localError, 'message', {
      enumerable: true,
      get: () => this.interfaceError
    })
    return { localError }
  },
  data() {
    return {
      interfaceError: null,
      isLoading: false,
      agencySetupControls: {
        next: new FooterControl({
          text: this.$t('agency_structure.save_cont'),
          // style: ["is-tmpst-info"],
          action: () => {
            this.submitAgencyInfo(this.profile)
              .then(() => {
                this.refreshToken().then(() => {
                  this.$refs.boardTabs.next()
                  this.formErrors.clear()
                })
              })
              .catch((e) => {
                this.formErrors.record(this.mappedError)
                //this.notify(e)
              })
          }
        })
      },
      controlsJobTypes: {
        prev: new FooterControl({
          text: this.$t('agency_structure.previous'),
          // style: ["is-tmpst-info"],
          action: () => {
            this.$refs.boardTabs.prev()
          }
        }),
        next: new FooterControl({
          text: this.$t('agency_structure.save_cont'),
          // style: ["is-tmpst-info"],
          action: () => {
            if (this.$refs.jobTypes.jobTypes.children.length !== 0) {
              this.$refs.boardTabs.next()
            } else {
              this.interfaceError = this.$t('agency_structure.job_type_error')
            }
          }
        })
      },
      controlsJobTimes: {
        prev: new FooterControl({
          text: this.$t('agency_structure.previous'),
          // style: ["is-tmpst-info"],
          action: () => {
            this.$refs.boardTabs.prev()
          }
        }),
        save: new FooterControl({
          text: this.$t('global.save'),
          // style: ["is-tmpst-info"],
          action: async () => {
            if (this.isLoading) return false
            this.isLoading = true
            try {
              await this.submitTimeTab()

              //Untill backend fixes the out-of-sync db this needs to stay
              setTimeout(async () => {
                await this.getClientsWithChildrenAndDayTimes()
                this.isLoading = false
              }, 1000)
            } catch (e) {
              this.isLoading = false
            }
          }
        }),
        next: new FooterControl({
          text: this.$t('agency_structure.save_cont'),
          // style: ["is-tmpst-info"],
          action: async () => {
            if (this.isLoading) return false
            this.isLoading = true
            try {
              await this.submitTimeTab()
              this.isLoading = false
              this.selectClientJobTimes(null)
              this.$refs.boardTabs.next()
            } catch (e) {
              this.isLoading = false
            }
          }
        })
      },
      controls: {
        prev: new FooterControl({
          text: this.$t('agency_structure.previous'),
          // style: ["is-tmpst-info"],
          action: () => {
            this.$refs.boardTabs.prev()
          }
        }),
        next: new FooterControl({
          text: this.$t('agency_structure.save_cont'),
          // style: ["is-tmpst-info"],
          action: () => {
            this.$refs.boardTabs.next()
          }
        })
      },
      controlsLast: {
        prev: new FooterControl({
          text: this.$t('agency_structure.previous'),
          // style: ["is-tmpst-info"],
          action: () => {
            this.$refs.boardTabs.prev()
          }
        }),
        done: new FooterControl({
          text: this.$t('agency_structure.done'),
          // style: ["is-tmpst-info"],
          action: () => {
            if (!this.getSetupStatus) {
              this.completeSetup().then(() => {
                this.$router.push('/dashboard')
              })
            } else {
              this.$router.push('/dashboard')
            }
          }
        })
      }
    }
  },

  computed: {
    ...mapGetters('userManagement', ['getSetupStatus']),
    ...mapState('onboarding/agencySettings', ['profile']),
    ...mapState(['serverErrors']),
    ...mapState({ mappedError: (state) => state.serverErrors }),
    tabNavigation: function () {
      return this.getSetupStatus
    }
  },

  watch: {
    '$route.hash': function () {
      this.interfaceError = null
    },
    'serverErrors.onboarding': function (e) {
      if (e) {
        const text = e
        const error = this.$merge(errorDefaults, {
          group: 'boardstep',
          title: 'Onboarding',
          duration: 5000,
          text
        })
        this.$notify(error)
      }
    }
  },

  methods: {
    ...mapActions('auth', ['refreshToken']),
    ...mapActions('onboarding/jobTimes', [
      'submitManager',
      'selectClientJobTimes'
    ]),
    ...mapActions('onboarding/roles', ['completeSetup']),
    ...mapActions('onboarding/agencySettings', ['submitAgencyInfo']),
    ...mapActions('clients', ['getClientsWithChildrenAndDayTimes']),

    submitTimeTab() {
      return this.submitManager()
        .then(() => {
          return Promise.resolve()
        })
        .catch((e) => {
          this.notify(e)
          return Promise.reject(e)
        })
    },
    submitPayrateTab() {
      return this.$refs.payrates
        .submitPayrates()
        .then(() => {
          return Promise.resolve()
        })
        .catch((e) => {
          this.notify(e)
          return Promise.reject(e)
        })
    },

    notify(e) {
      const text = this.serverErrors.message
      const error = this.$merge(errorDefaults, {
        group: 'boardstep',
        text
      })
      this.$notify(error)
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/styles/global/partials/tree-lines';

.notifications {
  &.custom-center-position {
    top: 113px !important;
    margin-left: 33px;
  }
}
</style>
<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/tree-lines';

.notifications {
  &.custom-center-position {
    top: 113px !important;
    margin-left: 33px;
  }
}
</style>

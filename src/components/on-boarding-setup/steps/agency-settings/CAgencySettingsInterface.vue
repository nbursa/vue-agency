<template lang="pug">
  base-side-tabs(
    ref="apTabs"
    :sparseClick="true"
    )
    v-tab(:name="$t('agency_settings.agency_details')" :isLoading="isLoading")
      v-on-boarding-setup-content-box(
        :controls="controls"
        @child-save="childSave"
        )
        p(slot="description")
          | {{ $t("agency_settings.agency_details") }}
        v-agency-settings-details(
          @agency-changed="agencyChanged"
          :profile="agency || {}"
          :formErrors="formErrors"
          :showImageUploader="agency && agency.id === profile.id"
          )
    v-tab(:name="$t('agency_settings.billing_details')" :isLoading="isLoading")
      v-on-boarding-setup-content-box(
        :controls="controls"
        @child-save="childSave"
        )
        p(slot="description")
          | {{ $t("agency_settings.billing_details") }}
        v-agency-settings-billing-details(
          :profile="agency || {}"
          :formErrors="formErrors"
          )
</template>
<script>
import { mapActions, mapState } from "vuex"

import VAgencySettingsDetails from "./VAgencySettingsDetails"
import VAgencySettingsBillingDetails from "./VAgencySettingsBillingDetails"
import VTabs from "@/components/on-boarding-setup/VTabs"
import VTab from "@/components/on-boarding-setup/VTab"

import VOnBoardingSetupContentBox from "@/components/on-boarding-setup/VOnBoardingSetupContentBox"

import { FooterControl } from "@/factories"
import { errorDefaults, successDefaults } from "@/config/notifications"
import { formErrors } from "@/mixins/formErrorsMixin"

export default {
  mixins: [formErrors],
  name: "AgencyProfileInterface",
  components: {
    VAgencySettingsDetails,
    VAgencySettingsBillingDetails,
    VTabs,
    VTab,
    VOnBoardingSetupContentBox
  },
  data() {
    const sharedControls = {
      prev: new FooterControl({
        text: this.$t("agency_settings.previous"),
        action: () => {
          this.$refs.apTabs.prev()
        }
      }),
      next: new FooterControl({
        text: this.$t("agency_settings.next"),
        action: () => {
          this.$refs.apTabs.next()
        }
      })
    }
    return {
      agency: null,
      controls: {
        ...sharedControls,
        save: new FooterControl({
          text: this.$t("agency_settings.save_cont"),
          action: "childSubmit",
          style: ["is-tmpst-info"]
        }),
        logout: new FooterControl({
          text: this.$t("agency_settings.logout"),
          action: async () => {
            await this.logout()
            this.$router.replace({ name: "login" })
          },
          style: ["is-pulled-left--custom"]
        })
      }
    }
  },
  computed: {
    ...mapState("onboarding/agencySettings", ["profile"]),
    ...mapState({
      mappedError: state => state.serverErrors,
      isLoading: state => state.isLoading
    }),
    ...mapState("agencies", ["agencies"])
  },
  created() {
    this.getProfile().then(() => {
      // set agency from mapState
      this.agency = this.profile
    })
    this.getAgencies()
  },
  methods: {
    ...mapActions("onboarding/agencySettings", [
      "getProfile",
      "updateAgencyDetails"
    ]),
    ...mapActions("agencies", ["getAgencies"]),
    ...mapActions("auth", ["logout"]),
    childSave(payload) {
      /* TODO determine from payload, which child we are saving... */
      switch (payload.context) {
        case "AgencySettingsDetails":
          this.saveAgencySettingsDetails(payload.data)
          break
        case "AgencySettingsBillingDetails":
          this.saveAgencySettingsBillingDetails(payload.data)
          break

        default:
          console.log("save from unknown tab component")
      }
    },
    agencyChanged(payload) {
      // Do nothing if same id (agency not changed)
      if (this.agency.id === payload.id) {
        return
      }
      this.agency = payload
      // Clear errors
      this.formErrors.clear()
    },
    saveAgencySettingsDetails(payload) {
      this.updateAgencyDetails(payload)
        .then(agency => {
          // update form data
          this.agency = agency
          this.$notify(
            this.$merge(successDefaults, {
              group: "foo",
              text: this.$t("agency_settings.toast_success")
            })
          )
          // this.$refs.pTabs.next()
        })
        .catch(message => {
          this.$notify(
            this.$merge(errorDefaults, {
              group: "foo",
              text: message
            })
          )
          this.formErrors.record(this.mappedError)
        })
    },
    saveAgencySettingsBillingDetails(payload) {
      this.saveAgencySettingsDetails(payload)
    }
  }
}
</script>

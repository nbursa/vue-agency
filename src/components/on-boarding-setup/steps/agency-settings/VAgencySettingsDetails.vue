<template lang="pug">
  .columns.is-multiline.is-mobile.is-centered
      .column.is-3.is-offset-8
        p {{ $t("agency_settings.select_label") }}
        v-agency-selector(v-model="agency" :is-multiple="false" :is-clearable="false")
      .column.is-8
        form(@submit.prevent="submit")
            base-image-uploader(
              v-if="showImageUploader"
              :uploadUrl="'/agency-profile/logo'"
              :on-progress="onProgress"
              :preview-image="profile.logo"
              field-name="logo"
            )
            .input-label-group
              input.is-expandable.is-disabled(
                disabled
                name="agencyName"
                type="text"
                placeholder=""
                v-model.trim="form.name"
              )
              label.control-label {{ $t("agency_settings.agency_name") }}
            .input-label-group
              input.is-expandable.is-disabled(
                disabled
                name="centralPostcode"
                type="text"
                placeholder=""
                v-model.trim="form.centralPostcode"
              )
              label.control-label {{ $t("agency_settings.central_postcode") }}
              p.help.is-danger {{ formErrors.get('centralPostcode') }}
            .input-label-group
              input.is-expandable(
                name="centralAddress"
                type="text"
                placeholder=""
                v-model.trim="form.centralAddress"
                @keydown="formErrors.clear('centralAddress')"
                required
              )
              label.control-label {{ $t("agency_settings.central_address") }}
              span.req-attribute required
              p.help.is-danger {{ formErrors.get('centralAddress') }}
            .input-label-group
              input.is-expandable(
                name="city"
                type="text"
                placeholder=""
                v-model.trim="form.city"
                @keydown="formErrors.clear('city')"
                required
              )
              label.control-label {{ $t("agency_settings.city") }}
              span.req-attribute {{ $t("agency_settings.required") }}
              p.help.is-danger {{ formErrors.get('city') }}
            .input-label-group
              input.is-expandable(
                name="mainPhone"
                type="text"
                placeholder=""
                v-model.trim="form.mainPhone"
                required
                @keydown="formErrors.clear('mainPhone')"
              )
              label.control-label {{ $t("agency_settings.main_phone") }}
              p.help.is-danger {{ formErrors.get('mainPhone') }}
</template>
<script>
import VAgencySelector from "@/components/shared/agency-selector/VAgencySelector"
import { BasicForm } from "@/models/BasicForm"

export default {
  components: { VAgencySelector },
  name: "AgencySettingsDetails",
  props: {
    showImageUploader: {
      type: Boolean,
      required: false,
      default: false
    },
    profile: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    formErrors: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedAgency: null
    }
  },
  computed: {
    form: function() {
      if (this.profile) {
        return new BasicForm(this.profile)
      }
    },
    agency: {
      get: function() {
        return {
          id: this.profile.id
        }
      },
      set: function(value, old) {
        this.selectedAgency = value
        this.$emit("agency-changed", value)
      }
    }
  },
  methods: {
    onProgress(progress) {
      console.log(`${this.$options.name}: ${progress}`)
    },
    submit() {
      this.$parent.$emit("child-save", {
        context: this.$options.name,
        data: this.form
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
$font-size = 1.455rem
$active-top = -1.8rem
$label-color = #838D98
$active-color = $focus-color = $label-color
@import '~@/assets/styles/global/label-input'
@import '~@/assets/styles/global/expandable-input'
</style>

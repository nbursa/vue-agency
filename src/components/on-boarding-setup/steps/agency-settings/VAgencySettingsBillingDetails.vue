<template lang="pug">
div.column.is-8.is-offset-2
  form(@submit.prevent="submit")
    .card-content
      .input-label-group
        input.is-expandable(
          name="billingPostcode"
          type="text"
          placeholder=""
          v-model.trim="form.billingPostcode"
          @keydown="formErrors.clear('billingPostcode')"
          required
        )
        label.control-label {{ $t("agency_settings.billing_postcode") }}
        span.req-attribute required
        p.help.is-danger {{ formErrors.get('billingPostcode') }}
      .input-label-group
        input.is-expandable(
          name="billingAddress"
          type="text"
          placeholder=""
          v-model.trim="form.billingAddress"
          @keydown="formErrors.clear('billingAddress')"
          required
        )
        label.control-label {{ $t("agency_settings.billing_address") }}
        span.req-attribute {{ $t("agency_settings.required") }}
        p.help.is-danger {{ formErrors.get('billingAddress') }}
      .input-label-group
        input.is-expandable(
          name="billingPhone"
          type="text"
          placeholder=""
          v-model.trim="form.billingPhone"
          @keydown="formErrors.clear('billingPhone')"
          required
        )
        label.control-label {{ $t("agency_settings.billing_phone") }}
        p.help.is-danger {{ formErrors.get('billingPhone') }}
</template>
<script>
import { BasicForm } from "@/models/BasicForm"

export default {
  name: "AgencySettingsBillingDetails",
  props: {
    profile: {
      type: Object,
      required: false,
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
    return {}
  },
  computed: {
    form: function() {
      if (this.profile) {
        return new BasicForm(this.profile)
      }
    }
  },
  methods: {
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

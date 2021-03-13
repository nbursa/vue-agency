<template lang="pug">
  div.base-phone-input(:class="customClass")
    label.sidebar-form_label {{ label }}
    div.sidebar-form_small-float
      vue-phone-number-input.base-phone-input__main(v-if="create" v-model="internalPhone" v-bind="optionsBind" @update="emitInput" :default-country-code="computedCountry" :translations="translationSet" :error="hasError" :ignored-countries="['XK']")
    .help.is-danger(v-if="error") {{error}}

    //- pre COMPUTED {{ translationSet }}
</template>

<script>
import { mapState } from 'vuex'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export default {
  components: {
    VuePhoneNumberInput
  },
  props: {
    value: {
      type: String,
      required: false,
      default: null
    },
    customClass: {
      type: String,
      required: false,
      default: 'sidebar-form_field'
    },
    optionsBind: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    watchForRerender: {
      type: [Object, String, Number],
      required: false,
      default: null
    },
    error: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      hasError: false,
      create: false,
      translationSet: {},
      internalPhone: ''
    }
  },
  computed: {
    ...mapState('agencies', ['agencies']),
    defaultCountry() {
      if (this.agencies.length && this.agencies[0].country) {
        return this.agencies[0].country
      }
      return null
    },
    computedCountry() {
      if (this.value === null) {
        return this.defaultCountry
      } else {
        return (
          parsePhoneNumberFromString(this.value) &&
          parsePhoneNumberFromString(this.value).country
        )
      }
    },
    phoneNumber: {
      get() {
        return this.value ? this.value : null
      },
      set() {
        this.internalPhone
      }
    },
    shouldValidate() {
      return this.internalPhone === this.value
    }
  },
  watch: {
    value: function (val) {
      this.internalPhone = val
    },
    watchForRerender: function () {
      this.create = false
      this.$nextTick(() => {
        this.create = true
        this.internalPhone = this.value
      })
    }
  },
  mounted() {
    this.translationSet = this.$t('global.phoneMask')
    if (!this.watchForRerender) {
      this.create = true
      this.internalPhone = this.value
    }
  },
  methods: {
    emitInput: function (val) {
      this.hasError = true
      if (val.isValid !== true && val.phoneNumber === undefined) {
        this.hasError = false
        this.$emit('input', val.formattedNumber)
      }
      if (val.isValid) {
        this.hasError = false
        this.$emit('input', val.formattedNumber)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';

.base-phone-input {
  overflow: visible !important;
  &__main {
    @media (max-width: $display-large-desktop) {
      flex-direction: column;
      >>> .select-country-container {
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        flex: 1;
        border-bottom: none;
      }
    }
  }
  & >>> .input-tel {
    &__input {
      border: 1px solid #dfe6eb;
      border-top-right-radius: 3px !important;
      border-bottom-right-radius: 3px !important;
      font-size: 13px;

      &::placeholder {
        font-size: 13px;
      }
      @media (max-width: 1440px) {
        margin-left: 0;
      }
    }
  }

  & >>> .country-selector {
    @media (max-width: $display-large-desktop) {
      width: 100%;
      border: 1px solid #dfe6eb;
      border-bottom: none;
      &__country-flag {
        width: 100%;
      }
    }
    &__input {
      font-size: 13px;
      border-top-left-radius: 3px !important;
      border-bottom-left-radius: 3px !important;
      border: 1px solid #dfe6eb;
      @media (max-width: $display-large-desktop) {
        display: none;
      }
    }
  }
}
</style>

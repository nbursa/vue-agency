<template lang="pug">
  .flatpickr(@click="$emit('flatpickr-click')")
    input(style="pointer-events: none", type='text', :placeholder='placeholder', :value='value' :class="{'hide': showInternalInput, [customClass]: true}" disabled v-show="!altInputFormater")
    input(style="pointer-events: none", type='text', :placeholder='placeholder' , :value='altValue' :class="{[customClass]: true}" disabled v-show="altInputFormater")
</template>

<script>
import Flatpickr from 'flatpickr'
import German from 'flatpickr/dist/l10n/de'
import DateTimeUtils from '@/utils/dateUtils.js'

const hooks = new Set([
  'onChange',
  'onOpen',
  'onClose',
  'onMonthChange',
  'onYearChange',
  'onReady',
  'onValueUpdate'
])

const langs = new Set([{ en: German.en }, { de: German.de }])
export default {
  props: {
    altInputFormater: {
      type: String,
      required: false,
      default() {
        return null
      }
    },
    showInternalInput: {
      type: Boolean,
      default: true,
      required: false
    },
    value: {
      type: [String, Array],
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Object,
      default: () => ({})
    },
    enableOnly: {
      type: Array,
      required: false,
      default: null
    },
    customClass: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      flatpicker: null
    }
  },
  computed: {
    hookedOptions() {
      return this.addHooks(this.options)
    },
    altValue() {
      if (this.altInputFormater) {
        return DateTimeUtils[this.altInputFormater](this.value)
      }
      return ''
    }
  },
  watch: {
    hookedOptions(options, oldOptions) {
      for (const [key, val] of Object.entries(options)) {
        if (val !== oldOptions[key]) {
          this.flatpicker.set(key, val)
        }
      }
    },
    value(newValue) {
      // Prevent value update if the v-model is the same
      if (newValue === this.$el.value) return
      this.flatpicker &&
        // Force update flatpicker instance
        this.flatpicker.setDate(newValue) //removed true param
    },
    '$i18n.locale': {
      handler: 'initFlatpickr',
      deep: true
    }
  },
  mounted() {
    const defaultLang = this.$i18n.locale || 'en'
    this.initFlatpickr(defaultLang)

    //when you need an immediate watch trigger but need it after mount
    this.$watch(
      'enableOnly',
      function (newVal) {
        if (this.enableOnly && this.enableOnly.length !== 0) {
          // have to reinitialize flatpickr instance, due to it loosing set date value when enabled array is updated
          this.initFlatpickr(defaultLang)
          this.flatpicker.set('enable', this.enableOnly)
        }
      },
      { immediate: true }
    )
    const self = this
  },
  destroyed() {
    this.flatpicker.destroy()
    this.flatpicker = null
  },
  methods: {
    // Initialize flatpickr and set localization based on vue i18n
    initFlatpickr(val) {
      for (let lang of langs) {
        if (val === Object.keys(lang)[0]) {
          Flatpickr.localize(lang[val])
        }
      }
      this.flatpicker = new Flatpickr(this.$el, this.hookedOptions)
      this.$emit('FlatpickrRef', this.flatpicker)
      if (this.value) {
        this.flatpicker.setDate(this.value)
      }
    },
    // Strips 'on' from event name
    removeOn(hook) {
      return hook.charAt(2).toLowerCase() + hook.substring(3)
    },
    //Hook iterator
    addHooks(options) {
      options = Object.assign({}, options)
      if (!options.onChange) {
        options.onChange = []
      } else if (!Array.isArray(options.onChange)) {
        options.onChange = [options.onChange]
      }
      options.onChange.push((selectedDates, dateStr) => {
        this.$emit('input', dateStr)
      })
      for (let hook of hooks) {
        let fire = (selectedDates, dateStr, instance) => {
          this.$emit(this.removeOn(hook), selectedDates, dateStr, instance)
        }
        if (hook in options) {
          // Must specify hooks as arrays
          if (!Array.isArray(options[hook])) options[hook] = [options[hook]]
          options[hook].push(fire)
        } else {
          options[hook] = [fire]
        }
      }
      return options
    }
  }
}
</script>
<style lang="stylus">

@import '~@/assets/styles/global/mixins';

.flatpickr {
  input {
    width: 100%;
    max-width: 200px;
    height: 32px;
    border: 1px solid $WFdarkGray;

    &:disabled {
      background-color: white;
      cursor: pointer;
    }

    &.fullWidthInput {
      position: relative;
      min-height: 65px;
      border: 1px solid #dfe6eb;
      border-radius: 3px;
      margin-bottom: 10px;
      margin-top: 1em;
      font-size: 18px;
      width: 100%;
      max-width: 100%;
      font-size: 18px;
      padding-left: 22px;
      opacity: 0.7;
      pointer-events: none;

      +placeholder() {
        color: #838D98;
        font-size: 18px;
        padding-left: 22px;
        opacity: 0.7;
      }
    }
    &.fat-input {
      width: 100px;
      height: 40px;
      text-align: center;
      font-size: 14px;
    }
  }

  .hide {
    display: none;
  }
}
</style>
